import type { ExperienceItemType } from "@/components/work-experience";

export const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "zoomi-softlab",
    companyName: "ZOOMi Softlab",
    isCurrentEmployer: true,
    role: {
      title: "Software Engineer Trainee",
      employmentPeriod: { start: "09.2025" },
      employmentType: "Full-time",
    },
    positions: [
      {
        id: "zoomi-eks-migration",
        title: "Multi-Tenant AWS EKS Migration",
        icon: "code",
        isExpanded: true,
        description:
          "- Migrated customers from EC2 to a multi-tenant AWS EKS platform using namespace isolation and shared cluster components.\n- Implemented GitOps with Argo CD and Helm; automated tenant onboarding to cut provisioning time from approximately 3-4 minutes to 2 minutes.\n- Designed secret management with AWS Secrets Manager and External Secrets Operator; achieved approximately 40% cost reduction with Karpenter autoscaling.",
        skills: [
          "AWS EKS",
          "Kubernetes",
          "Terraform",
          "Helm",
          "Argo CD",
          "Karpenter",
          "Docker",
        ],
      },
      {
        id: "zoomi-sso-migration",
        title: "Multi-Tenant SSO Migration",
        icon: "code",
        description:
          "- Re-architected a single-tenant SSO backend into a scalable multi-tenant system with JWT authentication and refresh token rotation across tenants.\n- Designed fine-grained authorization with RBAC and ABAC, supporting custom dynamic roles per tenant.",
        skills: ["NestJS", "TypeScript", "MongoDB", "JWT", "RBAC"],
      },
      {
        id: "zoomi-admin-dashboard",
        title: "Admin Dashboard for EKS Tenants",
        icon: "code",
        description:
          "- Built an internal admin dashboard to monitor EKS tenant health and customer metrics with a scalable component architecture.\n- Implemented access and refresh token authentication, and integrated backend APIs with TanStack Query.",
        skills: ["React", "Next.js", "NestJS", "MongoDB", "TanStack Query"],
      },
      {
        id: "zoomi-etl-pipeline",
        title: "QuickBooks to BigQuery Serverless ETL",
        icon: "code",
        description:
          "- Architected a serverless ETL pipeline on GCP using Cloud Run Jobs and GCP Workflows, replacing a Fivetran integration and cutting monthly costs from approximately $1,000 to $80-100.\n- Provisioned infrastructure with Terraform and implemented Python-based pipeline logic across extraction, normalization, loading, and transformation stages.",
        skills: ["GCP", "Cloud Run", "BigQuery", "Python", "Terraform", "DBT"],
      },
    ],
  },
  {
    id: "lseg",
    companyName: "London Stock Exchange Group",
    positions: [
      {
        id: "lseg-intern",
        title: "Intern - Software Engineering",
        employmentPeriod: { start: "04.2024", end: "12.2024" },
        employmentType: "Internship",
        icon: "code",
        description:
          "- Worked with AWS services (S3, EC2, EMR, SQS, Lambda) alongside Apache Airflow and Scala to develop and maintain scalable ETL pipelines for processing financial data.\n- Prepared technical documentation and system design artifacts to support data platform workflows and knowledge sharing.",
        skills: [
          "AWS",
          "Apache Airflow",
          "ETL Pipelines",
          "Scala",
          "Technical Documentation",
        ],
      },
    ],
  },
];
