import Image from "next/image";
import { profile, socials } from "@/content/profile";
import { WORK_EXPERIENCE } from "@/content/experience";
import { getAllProjects, getFeaturedProjects } from "@/lib/content";
import ProjectGrid from "@/components/ProjectGrid";
import Section from "@/components/Section";
import TechTabs from "@/components/TechTabs";
import { WorkExperience } from "@/components/work-experience";
import { FadeIn } from "@/components/FadeIn";

export default async function Home() {
  const [featuredProjects, allProjects] = await Promise.all([
    getFeaturedProjects(4),
    getAllProjects(),
  ]);

  return (
    <div className="space-y-12">
      {/* Status pill */}
      <FadeIn>
        <div className="flex items-center">
          {profile.availableForWork ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0d2e1e] px-3 py-1 pr-3.5 text-[12px] font-medium text-gl-success">
              <span className="inline-flex h-2 w-2 rounded-full bg-gl-success shadow-[0_0_0_4px_rgba(105,181,152,0.2)]" />
              Open to work
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full border border-gl-border bg-gl-surface-2 px-3 py-1 text-[12px] font-medium text-gl-text-muted">
              Not available for work
            </div>
          )}
        </div>
      </FadeIn>

      {/* Profile card */}
      <FadeIn delay={80}>
        <div className="rounded-2xl border border-gl-border bg-gl-surface p-5 shadow-gl sm:p-6">
          <div className="grid grid-cols-[auto_1fr] items-start gap-4 sm:gap-7">
            <div className="flex-shrink-0">
              <div className="overflow-hidden rounded-xl border border-gl-border">
                <Image
                  src="/images/square.png"
                  alt={profile.name}
                  width={96}
                  height={112}
                  className="h-20 w-16 object-cover object-top sm:h-28 sm:w-24"
                />
              </div>
            </div>
            <div className="min-w-0 space-y-3 sm:space-y-4">
              <div className="space-y-1">
                <h1 className="text-xl font-bold tracking-[-0.015em] text-gl-text sm:text-2xl">
                  {profile.name}
                </h1>
                <p className="text-[13px] text-gl-text-faint">
                  {profile.handle}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="h-4 w-[3px] rounded-full bg-gl-primary" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gl-text-faint sm:text-[11px] sm:tracking-[0.28em]">
                    Reach Out
                  </p>
                </div>
                <div className="flex gap-1.5 sm:gap-2.5">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gl-border bg-gl-surface-2 text-gl-text-muted transition-colors hover:border-[rgba(255,255,255,0.18)] hover:text-gl-text sm:h-9 sm:w-9"
                        aria-label={social.label}
                      >
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Headline + highlights */}
      <FadeIn delay={160}>
        <div className="flex gap-4">
          <div className="w-[3px] shrink-0 self-stretch rounded-full bg-gl-primary" />
          <div className="space-y-3 pb-2">
            <p className="text-[17px] italic font-medium leading-[1.7] text-gl-text">
              {profile.headline}
            </p>
            <ul className="space-y-2 text-[15px] text-gl-text">
              {profile.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gl-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>

      {/* Technologies & Tools */}
      <FadeIn delay={220}>
        <Section title="Technologies & Tools">
          <TechTabs />
        </Section>
      </FadeIn>

      {/* Projects */}
      <FadeIn delay={280} className="mt-8">
        <Section title="Project Portfolio">
          <p className="text-[15px] leading-[1.65] text-gl-text-muted">
            Each entry gives a quick project overview and links to the full
            implementation notes, constraints, and outcomes.
          </p>
          <ProjectGrid featured={featuredProjects} all={allProjects} />
        </Section>
      </FadeIn>

      {/* Experience */}
      <FadeIn delay={340}>
        <Section title="Experience">
          <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />
        </Section>
      </FadeIn>
    </div>
  );
}
