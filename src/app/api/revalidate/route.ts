import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CONTENT_CACHE_TAGS } from "@/lib/content";

type RevalidateScope = "all" | "blog" | "projects";

type RevalidatePayload = {
  scope?: RevalidateScope;
  secret?: string;
};

const scopeTags: Record<RevalidateScope, string[]> = {
  all: [CONTENT_CACHE_TAGS.blog, CONTENT_CACHE_TAGS.projects],
  blog: [CONTENT_CACHE_TAGS.blog],
  projects: [CONTENT_CACHE_TAGS.projects],
};

function getScope(input: string | null | undefined): RevalidateScope {
  if (input === "blog" || input === "projects" || input === "all") {
    return input;
  }

  return "all";
}

function validateSecret(secret: string | undefined) {
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { ok: false, message: "REVALIDATE_SECRET is not configured." },
      { status: 500 }
    );
  }

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, message: "Invalid revalidation secret." },
      { status: 401 }
    );
  }

  return null;
}

function triggerRevalidation(scope: RevalidateScope) {
  const tags = scopeTags[scope];
  tags.forEach((tag) => revalidateTag(tag, "max"));
  return tags;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const scope = getScope(searchParams.get("scope"));
  const secret = searchParams.get("secret") ?? request.headers.get("x-revalidate-secret") ?? undefined;

  const invalidSecretResponse = validateSecret(secret);
  if (invalidSecretResponse) {
    return invalidSecretResponse;
  }

  const tags = triggerRevalidation(scope);

  return NextResponse.json({
    ok: true,
    scope,
    tags,
    mode: "max",
    revalidatedAt: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  let payload: RevalidatePayload = {};

  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    payload = {};
  }

  const scope = getScope(payload.scope);
  const secret =
    payload.secret ??
    request.headers.get("x-revalidate-secret") ??
    request.nextUrl.searchParams.get("secret") ??
    undefined;

  const invalidSecretResponse = validateSecret(secret);
  if (invalidSecretResponse) {
    return invalidSecretResponse;
  }

  const tags = triggerRevalidation(scope);

  return NextResponse.json({
    ok: true,
    scope,
    tags,
    mode: "max",
    revalidatedAt: new Date().toISOString(),
  });
}
