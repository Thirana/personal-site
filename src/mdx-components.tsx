import type { MDXComponents } from "mdx/types";
import { Quote } from "lucide-react";

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
    blockquote: ({ className, ...props }) => (
      <div className="not-prose my-6 flex gap-4">
        <div className="relative flex w-5 shrink-0 justify-center text-emerald-300">
          <Quote className="relative z-10 h-5 w-5" />
          <span
            aria-hidden
            className="absolute top-7 bottom-0 w-0.5 bg-neutral-100/70"
          />
        </div>
        <blockquote
          className={`m-0 flex-1 border-0 p-0 text-sm italic font-medium leading-7 text-neutral-200 [&>p]:m-0 [&>p+p]:mt-3 ${
            className ?? ""
          }`}
          {...props}
        />
      </div>
    ),
    ...components,
  };
}
