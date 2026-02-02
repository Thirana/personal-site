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
    <div className="space-y-12">
      <div className="flex items-center gap-3 text-sm text-neutral-300">
        {profile.availableForWork ? (
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Available for work
          </span>
        ) : (
          <span className="muted">Not available for work</span>
        )}
      </div>

      <Card className="border-border/80 bg-panel/40">
        <CardContent className="flex flex-col items-center gap-6 py-5 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex-shrink-0">
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/images/square.png"
                alt={profile.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-100">
                {profile.name}
              </h1>
              <p className="text-sm text-neutral-400">{profile.handle}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/80 text-neutral-300 hover:text-neutral-100"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <div className="flex flex-col items-center text-emerald-300">
          <Quote className="h-5 w-5" />
          <span className="mt-2 h-full w-0.5 bg-neutral-100/70" />
        </div>
        <div>
          <p className="text-sm italic leading-7 text-neutral-200">
            {profile.headline}
          </p>
        </div>
      </div>

      <Section title="Skills & Tools">
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

      <Section title="Proof of Work">
        <ProjectGrid featured={featuredProjects} all={allProjects} />
      </Section>

      <Section title="Experience">
        <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />
      </Section>

      <Section title="Reach Out">
        <div className="flex flex-wrap gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-neutral-300 hover:text-neutral-100"
                aria-label={social.label}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
