import {
  Atom,
  Braces,
  BrickWall,
  Cloud,
  Cog,
  FileCode,
  Github,
  Goal,
  Layers,
  Linkedin,
  Mail,
  Route,
  Twitter,
} from "lucide-react";

export const profile = {
  name: "Thirana Embuldeniya",
  handle: "@_Thirana",
  headline:
    "I am an organized, self-motivated software engineer with 1 year of industry experience. Hands-on practical experience in cloud-native systems, DevOps practices, and full-stack development. Experience working with AWS, Kubernetes-based platforms, and building web applications. Reliable team player with a strong willingness to learn and grow.",
  availableForWork: true,
};

export const socials = [
  { label: "Email", href: "mailto:t.embuldeniya@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/Thirana", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/thirana-embuldeniya/",
    icon: Linkedin,
  },
  { label: "Twitter", href: "https://x.com/_Thirana", icon: Twitter },
];

export const skills = [
  { label: "React", icon: Atom },
  { label: "NextJS", icon: Layers },
  { label: "Express", icon: Route },
  { label: "JavaScript", icon: Braces },
  { label: "TypeScript", icon: FileCode },
  { label: "Go", icon: Goal },
  { label: "AWS", icon: Cloud },
  { label: "Backend", icon: BrickWall },
  { label: "DevOps", icon: Cog },
];

export const opsSignals = [
  { label: "Role", value: "Backend Engineer" },
  { label: "Focus", value: "Reliability + Data Systems" },
  { label: "Preferred Stack", value: "Node.js, Go, AWS" },
  { label: "Delivery Style", value: "Metrics-first" },
];

export const capabilityRows = [
  {
    domain: "API & Auth",
    focus: "Token rotation, RBAC, middleware-driven contracts.",
    signal: "JWT + role guards",
  },
  {
    domain: "Data & Modeling",
    focus: "Schema validation, indexing, pagination, soft-delete safety.",
    signal: "Indexes + cursor paging",
  },
  {
    domain: "Reliability",
    focus: "Error handling, idempotent flows, graceful shutdown.",
    signal: "Operational resilience",
  },
  {
    domain: "Observability",
    focus: "Structured logging, request tracing, debugging workflows.",
    signal: "Request IDs + logs",
  },
  {
    domain: "Platform Delivery",
    focus: "Kubernetes-style deployments and automation workflows.",
    signal: "GitOps + autoscaling",
  },
];

export const engineerSnapshot = [
  { label: "Multi-tenant Infra", value: "EKS namespace isolation" },
  { label: "Provisioning", value: "~4m -> ~2m onboarding" },
  { label: "Cost Profile", value: "~40% infra reduction" },
  { label: "Workflow", value: "GitOps + Helm + Argo CD" },
];
