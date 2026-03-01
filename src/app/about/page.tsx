import MetricPill from "@/components/MetricPill";
import MetaStrip from "@/components/MetaStrip";
import Tag from "@/components/Tag";
import { engineerSnapshot } from "@/content/profile";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4 rounded-2xl border border-border/80 bg-panel/35 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-neutral-400">
          Engineer Profile
        </p>
        <h1 className="text-3xl font-semibold text-neutral-100">About</h1>
        <p className="max-w-2xl text-sm leading-7 text-neutral-300">
          Backend-focused software engineer with practical experience in cloud-native
          systems, deployment workflows, and reliable API design.
        </p>
        <MetaStrip
          items={[
            { label: "Primary Focus", value: "Backend + Platform" },
            { label: "Core Stack", value: "Node.js, TypeScript, Go" },
            { label: "Cloud", value: "AWS + Kubernetes" },
            { label: "Engineering Style", value: "Operationally aware" },
          ]}
        />
      </div>

      <div className="space-y-3 rounded-xl border border-border/70 bg-panel/25 p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-400">
          Engineering Snapshot
        </p>
        <div className="flex flex-wrap gap-2.5">
          {engineerSnapshot.map((item) => (
            <MetricPill key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-border/70 bg-panel/25 p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-400">
          Focus Areas
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "API architecture",
            "Auth + RBAC",
            "Data consistency",
            "Observability",
            "GitOps workflows",
            "Cost-aware infrastructure",
          ].map((item) => (
            <Tag key={item} className="px-2.5 py-1 text-[10px] font-mono">
              {item}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
