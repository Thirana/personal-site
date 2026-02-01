import { profile, skills, socials } from "@/content/profile";
import { getAllProjects, getFeaturedProjects } from "@/lib/content";
import ProjectGrid from "@/components/ProjectGrid";
import Section from "@/components/Section";
import Tag from "@/components/Tag";

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

      <div className="panel space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-100">
              {profile.name}
            </h1>
            <p className="text-sm text-neutral-400">{profile.handle}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-neutral-300 hover:text-neutral-100"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <p className="text-base text-neutral-300">{profile.headline}</p>
      </div>

      <Section title="Skills & Tools">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      </Section>

      <Section title="Proof of Work">
        <ProjectGrid featured={featuredProjects} all={allProjects} />
      </Section>

      <Section title="Reach Out">
        <div className="flex flex-wrap gap-4 text-sm text-neutral-300">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="hover:text-neutral-100"
            >
              {social.label}
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
