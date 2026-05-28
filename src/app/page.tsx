import { Suspense } from "react";
import Image from "next/image";
import { Briefcase, GraduationCap, MapPin, Phone } from "lucide-react";
import { heroBioPoints } from "@/content/about";
import { profile, socials } from "@/content/profile";
import { WORK_EXPERIENCE } from "@/content/experience";
import {
  getAllProjects,
  getFeaturedProjects,
  getFeaturedBlogPost,
  getBlogMetaBySlug,
} from "@/lib/content";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import ProjectGrid from "@/components/ProjectGrid";
import Section from "@/components/Section";
import { WorkExperience } from "@/components/work-experience";
import { HomeBlogSection } from "@/components/HomeBlogSection";
import { FadeIn } from "@/components/FadeIn";
import { TypewriterText } from "@/components/TypewriterText";

const GITHUB_USERNAME = "Thirana";
const GITHUB_PROFILE_URL = "https://github.com/Thirana";

const heroSocials = socials.filter((s) =>
  ["GitHub", "LinkedIn", "Email"].includes(s.label),
);

export default async function Home() {
  const [featuredProjects, allProjects, featuredBlog, ...compactBlogs] =
    await Promise.all([
      getFeaturedProjects(4),
      getAllProjects(),
      getFeaturedBlogPost(),
      getBlogMetaBySlug("safe-order-creation-idempotency-transactions"),
      getBlogMetaBySlug("cursor-pagination-product-listing-api"),
      getBlogMetaBySlug("url-shortener-caching"),
    ]);
  const compactBlogPosts = compactBlogs.filter((p) => p != null);

  const contributions = getCachedContributions(GITHUB_USERNAME);

  const currentEmployer = WORK_EXPERIENCE.find((e) => e.isCurrentEmployer);
  const currentTitle =
    currentEmployer?.role?.title ?? currentEmployer?.positions[0]?.title;
  const currentCompany = currentEmployer?.companyName;

  const infoRows = [
    ...(currentTitle && currentCompany
      ? [
          {
            icon: Briefcase,
            text: (
              <>
                {currentTitle}
                <span className="text-gl-text-faint"> @ {currentCompany}</span>
              </>
            ),
          },
        ]
      : []),
    {
      icon: GraduationCap,
      text: "BSc (Hons) in Computer Engineering",
    },
    { icon: MapPin, text: "Colombo, Sri Lanka" },
    { icon: Phone, text: "+94 71 459 4040" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero — no card, direct on page ground */}
      <FadeIn>
        <div className="space-y-6">
          {/* Visual identity cluster: graph and photo/name are one unit */}
          <div className="space-y-4">
            <Suspense fallback={<GitHubContributionsFallback />}>
              <GitHubContributions
                contributions={contributions}
                githubProfileUrl={GITHUB_PROFILE_URL}
                hideFooter
                hideMonthLabels
                blockSize={14}
                blockMargin={3}
              />
            </Suspense>

            <div className="flex items-center gap-5 sm:gap-6">
              <div
                className="shrink-0 overflow-hidden rounded-full"
                style={{
                  boxShadow:
                    "0 0 0 2px var(--gl-bg), 0 0 0 4px var(--gl-primary)",
                }}
              >
                <Image
                  src="/images/square.png"
                  alt={profile.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover object-top"
                />
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-gl-text sm:text-[24px]">
                    {profile.name}
                  </h1>
                  {profile.availableForWork && (
                    <span className="inline-flex items-center rounded-full bg-[#1a3a28] px-2.5 py-1 text-[11px] font-bold tracking-[0.06em] uppercase text-[#a0dcb8]">
                      Open to work
                    </span>
                  )}
                </div>
                <p className="text-[15px] text-gl-text-faint">
                  <TypewriterText
                    text="Turning ideas into working software."
                    delay={500}
                    speed={48}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Facts and links cluster: info rows, divider, social pills */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {infoRows.map((row, i) => {
                const Icon = row.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-[14px] text-gl-text-muted"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gl-border bg-gl-surface-2">
                      <Icon className="h-3.5 w-3.5 text-gl-text-faint" />
                    </div>
                    <span>{row.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="h-px bg-gl-border" />

            <div className="flex flex-wrap gap-2">
              {heroSocials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center gap-2 rounded-full border border-gl-border bg-gl-surface-2 px-3.5 py-1.5 text-[12px] font-medium text-gl-text-muted transition-colors hover:border-[rgba(255,255,255,0.15)] hover:text-gl-text"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* About — extra breathing room before written content */}
          <div className="space-y-4 pt-2">
            <h2 className="text-[22px] font-bold tracking-[-0.02em] text-gl-text">
              About
            </h2>
            <ul className="space-y-3">
              {heroBioPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-[16px] leading-[1.7] text-gl-text-muted"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gl-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>

      {/* Projects */}
      <Section title="Project Portfolio">
        <FadeIn>
          <p className="text-[16px] leading-[1.7] text-gl-text-muted">
            Each entry gives a quick project overview and links to the full
            implementation notes, constraints, and outcomes.
          </p>
        </FadeIn>
        <ProjectGrid featured={featuredProjects} all={allProjects} />
      </Section>

      {/* Experience */}
      <Section title="Experience">
        <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />
      </Section>

      {/* Writing */}
      <Section title="Writing">
        <HomeBlogSection featured={featuredBlog} compact={compactBlogPosts} />
      </Section>
    </div>
  );
}
