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
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <div className="page flex min-h-screen flex-col gap-10 py-14 sm:py-16">
          <header className="border-b border-border pb-6">
            <div className="flex flex-col gap-4">
              <div className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-500">
                Personal Site
              </div>
              <Nav />
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-border pt-6 text-xs text-neutral-500">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>© 2026 Your Name. All rights reserved.</span>
              <span className="muted">Twitter · GitHub · LinkedIn</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
