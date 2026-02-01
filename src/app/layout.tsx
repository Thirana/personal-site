import type { Metadata } from "next";
import Link from "next/link";
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
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10 sm:px-8">
          <header className="mb-12 flex flex-col gap-4 border-b border-neutral-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Personal Site
            </div>
            <nav className="flex flex-wrap gap-4 text-sm text-neutral-600">
              <Link className="transition-colors hover:text-neutral-900" href="/">
                Home
              </Link>
              <Link
                className="transition-colors hover:text-neutral-900"
                href="/projects"
              >
                Projects
              </Link>
              <Link className="transition-colors hover:text-neutral-900" href="/blog">
                Blog
              </Link>
              <Link className="transition-colors hover:text-neutral-900" href="/about">
                About
              </Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-16 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 Your Name. All rights reserved.</p>
              <div className="flex gap-4">
                <span>Twitter</span>
                <span>GitHub</span>
                <span>LinkedIn</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
