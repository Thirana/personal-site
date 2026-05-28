export type TechRelatedItem = {
  label: string;
  href: string;
  type: "project" | "blog";
};

export type TechTab = {
  value: string;
  label: string;
  tools: string[];
  highlights: string[];
  related: TechRelatedItem[];
};

export const techTabs: TechTab[] = [
  {
    value: "web",
    label: "Web Development",
    tools: [
      "NestJS",
      "Express",
      "Node.js",
      "React",
      "Next.js",
      "TanStack Query",
      "Zod",
    ],
    highlights: [
      "Currently building Grow Logs, a full stack SaaS using NestJS, Next.js, and PostgreSQL, applying production level engineering concepts required for a real user facing product.",
      "Built this personal portfolio site with Next.js using static generation, tag based on demand revalidation, and automated social card generation per route.",
      "Built a production NestJS bootstrap sequence with env validation, global exception filter, request ID middleware, and structured logging interceptor.",
    ],
    related: [
      { label: "Grow Logs", href: "/projects/grow-logs", type: "project" },
      {
        label: "Personal Site",
        href: "/projects/personal-site",
        type: "project",
      },
      {
        label: "Production Style NestJS Backend",
        href: "/blog/production-style-nestjs-backend",
        type: "blog",
      },
    ],
  },
  {
    value: "data",
    label: "Data",
    tools: ["PostgreSQL", "Prisma", "Redis", "MongoDB"],
    highlights: [
      "Implemented cursor based pagination using a composite PostgreSQL index on (created_at, id) with a tie breaker to prevent record skipping under concurrent writes.",
      "Built a Redis cache aside layer that cut redirect latency from 638ms to 286ms and handled 2.5x more requests per second.",
      "Used SHA256 fingerprinting stored in PostgreSQL to make order creation idempotent under retries and duplicate submissions.",
    ],
    related: [
      {
        label: "Cursor Pagination in a Product API",
        href: "/blog/cursor-pagination-product-listing-api",
        type: "blog",
      },
      {
        label: "Safe Order Creation",
        href: "/blog/safe-order-creation-idempotency-transactions",
        type: "blog",
      },
    ],
  },
  {
    value: "auth",
    label: "Auth & Security",
    tools: ["JWT", "bcrypt", "HTTP only cookies", "Refresh tokens", "RBAC"],
    highlights: [
      "Built rotating refresh tokens with bcrypt hashed storage and full session wipe on reuse detection.",
      "Implemented RBAC using JWT role claims with role guards enforced on admin only endpoints.",
      "Delivered refresh tokens via HTTP only cookies scoped to the API origin to block XSS token theft.",
    ],
    related: [
      {
        label: "Session Security in Practice",
        href: "/blog/session-security-in-practice",
        type: "blog",
      },
      { label: "Grow Logs", href: "/projects/grow-logs", type: "project" },
    ],
  },
  {
    value: "infra",
    label: "Infrastructure",
    tools: [
      "AWS EKS",
      "Kubernetes",
      "Terraform",
      "Helm",
      "Argo CD",
      "Karpenter",
      "Docker",
    ],
    highlights: [
      "Migrated customers from EC2 to multi tenant AWS EKS with namespace isolation using Argo CD and Helm.",
      "Implemented Karpenter autoscaling achieving approximately 40% infrastructure cost reduction.",
      "Reduced tenant provisioning time from around 4 minutes to 2 minutes with automated GitOps onboarding.",
    ],
    related: [],
  },
];

export const aboutSummary =
  "I am a software engineer who works across backend systems, frontend interfaces, and cloud infrastructure. I enjoy studying how real production platforms are built and validated, then applying those patterns through self-driven projects and professional work. Currently I am building Grow Logs, a full stack SaaS, to put what I learn into practice.";

export const heroBioPoints = [
  "Software engineer with 1.5 years of industry experience and a BSc (Hons) in Computer Engineering from the University of Sri Jayewardenepura.",
  "Hands-on with cloud-native systems, DevOps practices, and full-stack development across AWS, Kubernetes-based platforms, and modern web frameworks.",
  "Studies real production patterns and applies them through self-driven projects. Currently building Grow Logs, a full-stack SaaS.",
];

export type AboutPrinciple = {
  title: string;
  description: string;
};

export type AboutCTALink = {
  label: string;
  href: string;
  external?: boolean;
};

export type AboutCTA = {
  title: string;
  message: string;
  links: AboutCTALink[];
};

export const aboutPrinciples: AboutPrinciple[] = [
  {
    title: "Discover real-world concepts",
    description:
      "I identify high-impact patterns from real production systems and research how they work at scale.",
  },
  {
    title: "Learn deeply and intentionally",
    description:
      "I study the why behind each concept - the tradeoffs, failure modes, and conditions where it applies.",
  },
  {
    title: "Implement and validate independently",
    description:
      "I build self-driven implementations to validate understanding through real, observable behavior.",
  },
  {
    title: "Integrate with existing foundations",
    description:
      "I connect new ideas to what I already know, growing a stronger and more coherent mental model of systems.",
  },
];

export const aboutCta: AboutCTA = {
  title: "Open to Conversations",
  message:
    "If you are hiring for software engineering roles, I am open to discussing project scope, ownership expectations, and technical fit.",
  links: [
    { label: "Email", href: "mailto:t.embuldeniya@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/thirana-embuldeniya/",
      external: true,
    },
  ],
};
