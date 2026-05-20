import { isValidElement, type ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodeToggle from "@/components/CodeToggle";

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return getTextContent(props.children);
  }

  return "";
}

function extractMermaidChart(children: ReactNode): string | null {
  if (!isValidElement(children)) {
    return null;
  }

  const props = children.props as {
    className?: string;
    "data-language"?: string;
    children?: ReactNode;
  };
  const className = typeof props.className === "string" ? props.className : "";
  const dataLang = props["data-language"];

  if (
    !className.split(/\s+/).includes("language-mermaid") &&
    dataLang !== "mermaid"
  ) {
    return null;
  }

  return getTextContent(props.children).trim();
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ className, ...props }) => (
      <a
        className={`text-gl-primary underline underline-offset-[3px] transition-colors hover:text-gl-primary-hover ${
          className ?? ""
        }`}
        {...props}
      />
    ),
    img: ({ className, alt = "", ...props }) => (
      <img
        className={`rounded-xl border border-gl-border ${className ?? ""}`}
        alt={alt}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={`mt-2 mb-6 rounded-r-xl border-l-[3px] border-gl-primary bg-gl-surface px-5 py-4 not-italic text-gl-text [&>p]:m-0 [&>p+p]:mt-3 ${
          className ?? ""
        }`}
        {...props}
      />
    ),
    pre: ({ children, className, ...props }) => {
      const chart = extractMermaidChart(children);

      if (chart) {
        return <MermaidDiagram chart={chart} className={className} />;
      }

      return (
        <pre
          className={`not-prose overflow-x-auto rounded-xl border border-gl-primary/30 bg-gl-surface-2 px-5 py-4 text-sm leading-relaxed ${className ?? ""}`}
          {...props}
        >
          {children}
        </pre>
      );
    },
    CodeToggle,
    ...components,
  };
}
