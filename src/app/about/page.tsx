import type { Metadata } from "next";
import { aboutCta, aboutPrinciples, aboutSummary } from "@/content/about";
import { getBlogMetaBySlug, getProjectMetaBySlug, type ProjectMeta, type ContentMeta } from "@/lib/content";
import TechTabs from "@/components/TechTabs";
import FeaturedWorkTabs from "@/components/FeaturedWorkTabs";
import { FadeIn } from "@/components/FadeIn";
import Section from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer working across backend systems, frontend interfaces, and cloud infrastructure.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: "/about",
    title: `About | ${siteConfig.name}`,
    description:
      "Software engineer working across backend systems, frontend interfaces, and cloud infrastructure.",
  },
  twitter: {
    card: "summary",
    title: `About | ${siteConfig.name}`,
    description:
      "Software engineer working across backend systems, frontend interfaces, and cloud infrastructure.",
    creator: siteConfig.authorHandle,
  },
};

export default async function AboutPage() {
  const [growLogs, personalSite, sessionSecurity, safeOrder] = await Promise.all([
    getProjectMetaBySlug("grow-logs"),
    getProjectMetaBySlug("personal-site"),
    getBlogMetaBySlug("session-security-in-practice"),
    getBlogMetaBySlug("safe-order-creation-idempotency-transactions"),
  ]);

  const projects = [growLogs, personalSite].filter((p): p is ProjectMeta => p != null);
  const posts = [sessionSecurity, safeOrder].filter((p): p is ContentMeta => p != null);

  return (
    <div className="space-y-12">
      {/* Page header */}
      <FadeIn>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <p className="shrink-0 font-mono text-[14px] font-bold uppercase tracking-[0.2em] text-gl-primary">
              Engineer Profile
            </p>
            <div className="flex-1 border-t border-gl-border" />
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.024em] text-gl-text sm:text-4xl">
            About
          </h1>
          <p className="max-w-2xl text-[16px] leading-[1.7] text-gl-text">
            {aboutSummary}
          </p>
        </div>
      </FadeIn>

      {/* Technologies & Tools */}
      <FadeIn delay={120}>
        <Section title="Technologies & Tools">
          <TechTabs />
        </Section>
      </FadeIn>

      {/* Featured Work */}
      <FadeIn delay={200}>
        <Section title="Featured Work">
          <FeaturedWorkTabs projects={projects} posts={posts} />
        </Section>
      </FadeIn>

      {/* How I Work */}
      <FadeIn delay={280}>
        <Section title="How I Work">
          <div className="grid gap-3 sm:grid-cols-2">
            {aboutPrinciples.map((item, index) => (
              <article
                key={item.title}
                className="space-y-1.5 rounded-xl border border-gl-border bg-gl-surface p-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gl-text-faint">
                  {`0${index + 1}`}
                </p>
                <h3 className="text-[15px] font-bold tracking-[-0.013em] text-gl-text">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-[1.65] text-gl-text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Section>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={340}>
        <div className="rounded-2xl border border-gl-border bg-gl-surface p-6 shadow-gl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-[18px] w-[3px] rounded-full bg-gl-primary" />
              <h2 className="text-[17px] font-bold tracking-[-0.015em] text-gl-text">
                {aboutCta.title}
              </h2>
            </div>
            <p className="text-[15px] leading-[1.65] text-gl-text-muted">
              {aboutCta.message}
            </p>
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
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
