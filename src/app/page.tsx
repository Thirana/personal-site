import Image from "next/image";
import { Quote } from "lucide-react";
import { profile, skills, socials } from "@/content/profile";
import { WORK_EXPERIENCE } from "@/content/experience";
import { getAllProjects, getFeaturedProjects } from "@/lib/content";
import ProjectGrid from "@/components/ProjectGrid";
import Section from "@/components/Section";
import Tag from "@/components/Tag";
import { Card, CardContent } from "@/components/ui/card";
import { WorkExperience } from "@/components/work-experience";

export default async function Home() {
  const [featuredProjects, allProjects] = await Promise.all([
    getFeaturedProjects(4),
    getAllProjects(),
  ]);

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="flex items-center">
        {profile.availableForWork ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(74,222,128,0.15)]" />
            Open to work
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-neutral-300 sm:text-sm">
            Not available for work
          </span>
        )}
      </div>

      <Card className="border-white/20 bg-panel/40 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        <CardContent className="grid grid-cols-[auto_1fr] items-start gap-4 p-4 sm:gap-7 sm:p-6">
          <div className="flex-shrink-0">
            <div className="overflow-hidden rounded-lg border border-border/80">
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
              <h1 className="text-xl font-semibold leading-tight text-neutral-100 sm:text-2xl">
                {profile.name}
              </h1>
              <p className="text-sm text-neutral-400">{profile.handle}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="h-4 w-1 rounded-full bg-emerald-400/80" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:text-[11px] sm:tracking-[0.28em]">
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
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/80 text-neutral-300 transition-colors hover:border-neutral-400/70 hover:text-neutral-100 sm:h-9 sm:w-9"
                      aria-label={social.label}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <div className="flex flex-col items-center text-emerald-300">
          <Quote className="h-5 w-5" />
          <span className="mt-2 h-full w-0.5 bg-neutral-100/70" />
        </div>
        <div className="space-y-3">
          <p className="text-sm italic font-medium leading-7 text-neutral-200">
            {profile.headline}
          </p>
          <ul className="space-y-2 text-sm text-neutral-300">
            {profile.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Section title="Technologies & Tools">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Tag
              key={skill.label}
              icon={<skill.icon className="h-4 w-4" />}
              className="px-3.5 py-1.5 text-sm"
            >
              {skill.label}
            </Tag>
          ))}
        </div>
      </Section>

      <Section title="Project Portfolio">
        <ProjectGrid featured={featuredProjects} all={allProjects} />
      </Section>

      <Section title="Experience">
        <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />
      </Section>
    </div>
  );
}
