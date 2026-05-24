# CI Pipeline

CI runs automatically on every push to `main` and every pull request. The two jobs run in parallel — neither depends on the other.

```
push / PR to main
        │
   ┌────┴────┐
quality    build
   │          │
   tsc        next build --webpack
   eslint
   prettier
   --check
```

**Run these commands locally before pushing.** If they all pass locally, CI will pass.

---

## Pre-commit Gate (local, runs before CI)

Husky runs `lint-staged` automatically on every `git commit`. This catches formatting and lint errors before they ever reach CI.

**What lint-staged does on commit:**

| Staged files         | Commands run                                        |
| -------------------- | --------------------------------------------------- |
| `src/**/*.{ts,tsx}`  | `eslint --fix --max-warnings=0`, `prettier --write` |
| `**/*.{json,css,md}` | `prettier --write`                                  |

`eslint --fix` auto-corrects fixable issues (import style, etc.) and then aborts the commit if any unfixable errors remain. `--max-warnings=0` upgrades warnings to errors at commit time — `no-console` is configured as a warning during development but becomes a commit blocker here.

`prettier --write` formats the file in place. The formatted version is what gets committed.

The pre-commit gate does **not** run typecheck or build — those are CI's responsibility. Its purpose is to ensure no lint error or formatting issue enters git history.

---

## Setup (run once)

```bash
npm ci
```

`npm ci` installs all packages from the lockfile and also runs `husky` via the `prepare` script, which activates the pre-commit hook. No separate Husky setup step is needed.

**Verify the hook is active:**

```bash
cat .husky/pre-commit
# Should print: npx lint-staged
```

If the hook is not running after `npm ci`, check that `.husky/pre-commit` is executable:

```bash
chmod +x .husky/pre-commit
```

---

## Job 1 — Quality

Checks type correctness, code quality, and formatting across all source files. Runs the three steps sequentially — if typecheck fails, the job stops before running lint.

```bash
npm run typecheck
npm run lint
npm run prettier:check
```

### What each check does

| Check            | Tool                        | What it catches                                            |
| ---------------- | --------------------------- | ---------------------------------------------------------- |
| `typecheck`      | TypeScript (`tsc --noEmit`) | Type errors across all source files                        |
| `lint`           | ESLint                      | Code quality and pattern errors — see rules below          |
| `prettier:check` | Prettier (`--check .`)      | Formatting — spacing, quotes, trailing commas, line length |

### TypeScript compiler options

Beyond `strict: true`, three additional flags are enabled in `tsconfig.json`:

| Flag                 | What it catches                                         |
| -------------------- | ------------------------------------------------------- |
| `noUnusedLocals`     | Local variables declared but never read                 |
| `noUnusedParameters` | Function parameters declared but never used in the body |
| `noImplicitOverride` | Class methods overriding a parent must use `override`   |

### ESLint rules

The ESLint config uses type-aware linting (`parserOptions.project: true`) — rules have access to TypeScript's full type graph.

| Rule                                               | Severity | What it catches                                                              |
| -------------------------------------------------- | -------- | ---------------------------------------------------------------------------- |
| `@typescript-eslint/no-floating-promises`          | error    | Promises not awaited, `.catch()`-ed, or explicitly `void`-ed                 |
| `@typescript-eslint/consistent-type-imports`       | error    | Type-only imports not using `import type` / `import { type X }`              |
| `@typescript-eslint/no-explicit-any`               | error    | `any` type anywhere in source — use `unknown` and narrow instead             |
| `no-restricted-imports`                            | error    | `../` relative imports — use `@/*` instead                                   |
| `no-console`                                       | warn\*   | `console.log` / `console.debug` — `console.error` and `console.warn` allowed |
| Next.js core web vitals (via `eslint-config-next`) | varies   | React hooks rules, jsx-a11y accessibility, Next.js-specific patterns         |

\* `no-console` is a warning in the ESLint config but `--max-warnings=0` in lint-staged and CI treats it as an error — it cannot reach `main`.

### If `typecheck` fails

```bash
npm run typecheck
```

The error output shows the exact file and line. Fix in your editor. Common causes:

- A value that can be `undefined` used without a null check (`strictNullChecks`)
- An imported symbol used only as a type but not imported with `import type`
- A local variable declared but never used (`noUnusedLocals`)
- A function parameter that is never read inside the body (`noUnusedParameters`)

### If `lint` fails

Auto-fix what ESLint can correct automatically:

```bash
npx eslint --fix src/
```

`--fix` handles: `consistent-type-imports` (rewrites the import line), some `no-floating-promises` cases. Issues it cannot fix — `no-explicit-any`, manual `../` import paths, unhandled promises — must be fixed manually. Re-run `npm run lint` after fixing to confirm.

### If `prettier:check` fails

```bash
npx prettier --write .
```

Prettier rewrites every file that does not match the configured style. `.prettierignore` excludes `.next/`, `node_modules/`, `public/`, and `*.mdx` files. After running `--write`, re-run `npm run prettier:check` to confirm all files are clean.

**Prettier config (`.prettierrc`):**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```

---

## Job 2 — Build

Compiles the site with `next build --webpack`. Runs in parallel with `quality` — both jobs must pass for the pipeline to be green.

```bash
npm run build
```

Webpack is used intentionally — MDX serialization is currently incompatible with Turbopack.

**What the build additionally verifies beyond compilation:**

- **MDX frontmatter** — `src/lib/content.ts` reads every `.mdx` file in `content/` during static param generation. Project frontmatter with missing required fields (`title`, `date`, `summary`, `status`, `tech`) throws at this stage and fails the build. This means a broken project entry is caught in CI before it reaches production.
- **Typed routes** — `next.config.ts` has `experimental.typedRoutes: true`. During `next build`, Next.js generates TypeScript types for every route in `app/`. Every `<Link href="...">` is checked against those types. A link pointing to a deleted or renamed route is a type error that fails the build — dead internal links cannot reach `main`.

**Build cache:** CI caches `.next/cache` keyed on `package-lock.json` + a hash of all `src/**/*.ts`, `src/**/*.tsx`, and `content/**/*.mdx` files. Builds that hit the cache finish significantly faster. A dependency update or any source change invalidates the cache and triggers a full rebuild.

### If `build` fails

Run locally to reproduce the error:

```bash
npm run build
```

Common causes and where to look:

| Symptom                                           | Likely cause                                                         |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| Error during `generateStaticParams` for a project | Missing required frontmatter field in a `content/projects/` MDX file |
| `Type error: ... is not assignable to type Route` | A `<Link href="...">` points to a route that no longer exists        |
| TypeScript compile error in a page or component   | A type introduced or broken in the same changeset                    |

---

## Run Everything Locally

```bash
npm ci && \
npm run typecheck && \
npm run lint && \
npm run prettier:check && \
npm run build
```

This matches the exact checks CI runs. If this chain passes locally with a clean `npm ci`, the pipeline will pass.

---

## Notes

- **Node version:** CI runs Node 20 (`@types/node: ^20`). Match locally with `nvm use 20` if needed.
- **Pre-commit hook not running:** Run `npm ci` — it re-activates Husky via the `prepare` script. If still not running, check `chmod +x .husky/pre-commit`.
- **MDX files excluded from Prettier:** `*.mdx` is in `.prettierignore`. Prettier does not check or reformat MDX content files — only TypeScript, CSS, JSON, and Markdown config files.
- **`no-console` in CI:** The lint step runs `eslint` without `--max-warnings=0` but the rule is a `warn`, so it shows up as a warning. If any `console.log` was committed (bypassing the pre-commit gate with `--no-verify`), the CI lint step will surface it as a warning in the log but not fail the job. Add `--max-warnings=0` to `npm run lint` if you want CI to enforce this strictly.
- **Dependabot:** Weekly PRs are opened automatically for npm package updates and GitHub Actions version bumps. CI runs on those PRs, so breaking updates are caught before you merge.
