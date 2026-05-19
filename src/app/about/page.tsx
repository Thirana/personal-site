import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  aboutCta,
  aboutIntro,
  aboutPrinciples,
  aboutProof,
  aboutValueProps,
} from "@/content/about";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Proof first profile focused on reliable backend delivery, measurable outcomes, and production ownership.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: "/about",
    title: `About | ${siteConfig.name}`,
    description:
      "Proof first profile focused on reliable backend delivery, measurable outcomes, and production ownership.",
  },
  twitter: {
    card: "summary",
    title: `About | ${siteConfig.name}`,
    description:
      "Proof first profile focused on reliable backend delivery, measurable outcomes, and production ownership.",
    creator: siteConfig.authorHandle,
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <section className="glass-panel space-y-4 rounded-2xl border border-transparent bg-gl-surface p-6 shadow-gl">
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-gl-text-faint">
            {aboutIntro.eyebrow}
          </p>
          <h1 className="text-3xl font-bold tracking-[-0.022em] text-gl-text">
            {aboutIntro.title}
          </h1>
          <p className="max-w-2xl text-[16px] leading-[1.65] text-gl-text-muted">
            {aboutIntro.summary}
          </p>
          <div className="grid overflow-hidden rounded-xl border border-gl-border bg-gl-surface-2 sm:grid-cols-3">
            {aboutIntro.stats.map((item) => (
              <div
                key={item.label}
                className="space-y-1 border-b border-gl-border px-4 py-3 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gl-text-faint">
                  {item.label}
                </p>
                <p className="font-mono text-xs font-bold text-gl-primary">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={100}>
        <section className="glass-panel space-y-3 rounded-xl border border-transparent bg-gl-surface p-5 shadow-gl">
          <div className="flex items-center gap-3">
            <div className="h-[18px] w-[3px] rounded-full bg-gl-primary" />
            <h2 className="text-[17px] font-bold tracking-[-0.015em] text-gl-text">
              What You Get
            </h2>
          </div>
          <ul className="space-y-2 text-[15px] text-gl-text-muted">
            {aboutValueProps.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gl-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      <FadeIn delay={180}>
        <section className="glass-panel space-y-4 rounded-2xl border border-transparent bg-gl-surface p-5 shadow-gl sm:p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-[18px] w-[3px] rounded-full bg-gl-primary" />
              <h2 className="text-[17px] font-bold tracking-[-0.015em] text-gl-text">
                Selected Proof
              </h2>
            </div>
            <p className="text-[15px] text-gl-text-muted">
              Highlights chosen for fast review. Each item links to detailed evidence.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {aboutProof.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="glass-panel group flex h-full min-h-[180px] flex-col justify-between rounded-xl border border-transparent bg-gl-surface-2 p-4 shadow-gl transition-shadow duration-200 hover:shadow-gl-lg focus-visible:outline-none"
              >
                <div className="space-y-2">
                  <h3 className="text-[17px] font-bold tracking-[-0.015em] text-gl-text transition-colors group-hover:text-gl-primary">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-6 text-gl-text-muted">{item.metric}</p>
                  <p className="text-[12px] leading-5 text-gl-text-faint">{item.note}</p>
                </div>
                <span className="mt-4 inline-flex min-h-11 items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em] text-gl-primary">
                  View evidence
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={240}>
        <section className="glass-panel space-y-4 rounded-xl border border-transparent bg-gl-surface p-5 shadow-gl">
          <div className="flex items-center gap-3">
            <div className="h-[18px] w-[3px] rounded-full bg-gl-primary" />
            <h2 className="text-[17px] font-bold tracking-[-0.015em] text-gl-text">
              My Continuous Learning
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {aboutPrinciples.map((item, index) => (
              <article
                key={item.title}
                className="glass-panel space-y-1 rounded-xl border border-transparent bg-gl-surface-2 p-4 shadow-gl"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gl-text-faint">
                  {`0${index + 1}`}
                </p>
                <h3 className="text-[15px] font-bold text-gl-text">{item.title}</h3>
                <p className="text-[14px] leading-6 text-gl-text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={300}>
        <section className="glass-panel space-y-4 rounded-2xl border border-transparent bg-gl-surface p-6 shadow-gl">
          <div className="flex items-center gap-3">
            <div className="h-[18px] w-[3px] rounded-full bg-gl-primary" />
            <h2 className="text-[17px] font-bold tracking-[-0.015em] text-gl-text">
              {aboutCta.title}
            </h2>
          </div>
          <p className="text-[15px] leading-[1.65] text-gl-text-muted">{aboutCta.message}</p>
          <div className="flex flex-wrap gap-2">
            {aboutCta.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="glass-btn-primary inline-flex min-h-11 items-center justify-center rounded-[10px] px-5 text-[14px] font-semibold focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
