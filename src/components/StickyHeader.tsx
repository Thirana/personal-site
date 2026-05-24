"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BrandTypewriter from "./BrandTypewriter";
import Nav from "./Nav";

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-gl-border bg-gl-bg/80 backdrop-blur-2xl"
          : "border-b border-transparent",
      )}
    >
      <div className="page flex items-center justify-between gap-3 py-4">
        <Link
          href="/"
          aria-label="Thirana's personal site"
          className="text-[11px] font-bold uppercase tracking-[0.2em] text-gl-text transition-colors hover:text-gl-primary sm:text-sm sm:tracking-[0.35em]"
        >
          <BrandTypewriter />
        </Link>
        <Nav />
      </div>
    </header>
  );
}
