"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-4 text-sm">
      {links.map((link) => {
        const isHome = link.href === "/";
        const isActive = isHome
          ? pathname === "/"
          : pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative pb-1 text-neutral-400 transition-colors hover:text-neutral-100 hover:underline hover:underline-offset-4 ${
              isActive ? "text-neutral-100" : ""
            }`}
          >
            {link.label}
            {isActive ? (
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-neutral-600" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
