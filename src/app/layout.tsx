import type { Metadata } from "next";
import Nav from "../components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Site",
  description: "A minimal personal site built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        <div className="page flex min-h-screen flex-col gap-10 py-10 sm:py-12">
          <header className="border-b border-border pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm font-bold uppercase tracking-[0.35em] text-neutral-100">
                THIRANA'S PERSONAL BLOG
              </div>
              <Nav />
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-border pt-6 text-xs text-neutral-100">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>© 2026 Thirana Embuldeniya. All rights reserved.</span>
              <a
                href="https://github.com/you/repo"
                className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-200"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Source code available on GitHub
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
