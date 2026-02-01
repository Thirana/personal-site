import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ className, ...props }) => (
      <a
        className={`text-sky-300 transition-colors hover:text-sky-100 ${
          className ?? ""
        }`}
        {...props}
      />
    ),
    img: ({ className, alt = "", ...props }) => (
      <img
        className={`rounded-lg border border-border ${className ?? ""}`}
        alt={alt}
        {...props}
      />
    ),
    ...components,
  };
}
