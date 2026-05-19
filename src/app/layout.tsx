import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StickyHeader from "../components/StickyHeader";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", rel: "shortcut icon" },
    ],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.authorHandle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-gl-bg text-gl-text antialiased">
        <StickyHeader />
        <div className="page flex min-h-screen flex-col py-10">
          <main className="flex-1">{children}</main>

          <footer className="mt-16 border-t border-gl-border/40 py-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[13px] font-bold text-gl-text">
                Thirana Embuldeniya
              </span>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Thirana/personal-site"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] font-medium text-gl-text-muted transition-colors hover:text-gl-text"
                >
                  GitHub
                </a>
                <Link
                  href="/blog"
                  className="text-[13px] font-medium text-gl-text-muted transition-colors hover:text-gl-text"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-[13px] font-medium text-gl-text-muted transition-colors hover:text-gl-text"
                >
                  About
                </Link>
              </div>
              <span className="text-[12px] text-gl-text-faint">© 2026</span>
            </div>
          </footer>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
