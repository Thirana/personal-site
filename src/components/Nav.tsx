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
      "transition-colors hover:text-neutral-100",
      isActive ? "text-neutral-100" : "text-neutral-400"
    );

  return (
    <>
      <nav className="hidden items-center gap-5 text-sm sm:flex">
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
                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-neutral-100" />
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
            className="h-9 w-9 border-border/80 bg-panel/30 text-neutral-200 hover:bg-panel/50 hover:text-neutral-100 sm:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[82vw] max-w-[320px] border-0 bg-[#0b1220]/20 text-neutral-100 backdrop-blur-2xl shadow-[-28px_0_52px_-20px_rgba(2,6,23,0.65)] sm:hidden"
        >
          <SheetHeader className="border-b border-border/80 pr-14">
            <SheetTitle className="text-neutral-300">Navigation</SheetTitle>
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
                    "rounded-md px-4 py-3",
                    isActive
                      ? "bg-neutral-800/80 text-neutral-100"
                      : "text-neutral-200 hover:bg-neutral-800/40 hover:text-neutral-100"
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
