const DEFAULT_SITE_URL = "http://localhost:3000";

function stripTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function resolveSiteUrl() {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL;

  try {
    const normalized = new URL(configured).toString();
    return stripTrailingSlash(normalized);
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "Thirana's Personal Blog",
  description:
    "Backend-first engineering portfolio and blog focused on systems, reliability, and delivery quality.",
  url: resolveSiteUrl(),
  authorName: "Thirana Embuldeniya",
  authorHandle: "@_Thirana",
} as const;

export function absoluteUrl(pathname = "/") {
  if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
    return pathname;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.url}${normalizedPath}`;
}
