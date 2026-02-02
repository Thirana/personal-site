import type { ExperienceItemType } from "@/components/work-experience";

export const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "zoomi-softlab",
    companyName: "ZOOMi Softlab",
    isCurrentEmployer: true,
    positions: [
      {
        id: "zoomi-se-trainee",
        title: "Software Engineer Trainee",
        employmentPeriod: "Sep 2025 — Present",
        employmentType: "Full-time",
        icon: "code",
        description:
          "#### Multi-Tenant AWS EKS Migration (GitOps & DevOps)\n\n- Migrated customers from EC2 deployments to a multi-tenant AWS EKS platform using namespace isolation and shared cluster components.\n- Implemented GitOps deployments with Argo CD and Helm, plus automated tenant onboarding, reducing provisioning time from ~3–4 minutes to ~2 minutes.\n- Designed secure secret management with AWS Secrets Manager and External Secrets Operator.\n- Implemented autoscaling with Karpenter and achieved ~40% infrastructure cost reduction.\n\n#### Admin Dashboard for EKS Tenants (Internal Tool)\n\n- Built an internal admin dashboard to monitor EKS tenants and visualize usage and activity metrics.\n- Implemented authentication using access and refresh tokens.\n- Integrated backend APIs with TanStack Query for efficient data fetching and caching.",
        skills: [
          "AWS EKS",
          "Kubernetes",
          "Terraform",
          "Helm",
          "Argo CD",
          "Karpenter",
          "React",
          "TanStack Query",
          "Express",
          "MongoDB",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "lseg",
    companyName: "London Stock Exchange Group",
    positions: [
      {
        id: "lseg-intern",
        title: "Intern — Software Engineering",
        employmentPeriod: "Apr 2024 — Dec 2024",
        employmentType: "Internship",
        icon: "code",
        description:
          "- Worked with AWS services (S3, EC2, EMR, SQS, Lambda) to build and maintain scalable data processing systems.\n- Developed and maintained ETL pipelines with Apache Airflow for processing financial data.\n- Contributed to system design discussions and produced technical documentation to support data platform workflows.",
        skills: [
          "AWS",
          "Apache Airflow",
          "ETL Pipelines",
          "System Design",
          "Technical Documentation",
        ],
      },
    ],
  },
];
