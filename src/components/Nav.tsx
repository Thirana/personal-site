"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const getLinkClasses = (isActive: boolean) =>
    cn(
      "text-[14px] font-medium transition-colors",
      isActive ? "text-gl-text" : "text-gl-text-muted hover:text-gl-text"
    );

  return (
    <>
      <nav className="hidden items-center gap-6 sm:flex">
        {links.map((link) => {
          const isHome = link.href === "/";
          const isActive = isHome
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn("relative pb-1", getLinkClasses(isActive))}
            >
              {link.label}
              {isActive ? (
                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gl-primary" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9 border-gl-border bg-gl-surface text-gl-text-muted hover:bg-gl-surface-2 hover:text-gl-text sm:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[82vw] max-w-[320px] border-0 border-l border-gl-border bg-gl-bg-subtle/90 text-gl-text backdrop-blur-2xl shadow-[-28px_0_52px_-20px_rgba(0,0,0,0.65)] sm:hidden"
        >
          <SheetHeader className="border-b border-gl-border pr-14">
            <SheetTitle className="text-gl-text-muted">Navigation</SheetTitle>
          </SheetHeader>

          <nav className="grid gap-1 p-3 text-base">
            {links.map((link) => {
              const isHome = link.href === "/";
              const isActive = isHome
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-[15px] font-medium transition-colors",
                    isActive
                      ? "bg-gl-surface-2 text-gl-text"
                      : "text-gl-text-muted hover:bg-gl-surface text-gl-text"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
