# Work Experience

Displays a list of work experiences with role details and durations.

```tsx
import type { ExperienceItemType } from "@/components/work-experience";
import { WorkExperience } from "@/components/work-experience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "quaric",
    companyName: "Quaric Co., Ltd.",
    companyLogo: "https://assets.chanhdai.com/images/companies/quaric.svg",
    positions: [
      {
        id: "30d3a9fb-021d-452a-9d27-83655369b4b9",
        title: "Software Engineer",
        employmentPeriod: "03.2024 — present",
        employmentType: "Part-time",
        icon: "code",
        description: `- Integrated VNPAY-QR for secure transactions.
- Registered the e-commerce site with [online.gov.vn](https://online.gov.vn) for compliance.
- Developed online ordering to streamline purchases.
- Build and maintain ZaDark.com with Docusaurus, integrating AdSense.
- Develop and maintain the ZaDark extension for Zalo Web on Chrome, Safari, Edge, and Firefox — with 15,000+ active users via Chrome Web Store.`,
        skills: [
          "Next.js",
          "Strapi",
          "Auth0",
          "VNPAY-QR",
          "Docker",
          "NGINX",
          "Google Cloud",
          "Docusaurus",
          "Extension",
          "Research",
          "Project Management",
        ],
        isExpanded: true,
      },
      {
        id: "7586afb2-40e8-49c4-8983-2254c9446540",
        title: "Product Designer",
        employmentPeriod: "03.2024 — present",
        employmentType: "Part-time",
        icon: "design",
        description: `- Design UI/UX for Quaric Website with a seamless experience.
- Develop a Design System for consistency and efficiency.
- Create Quaric's brand identity, including logo and guidelines.`,
        skills: [
          "UI/UX Design",
          "UX Writing",
          "Design System",
          "Brand Design",
          "Figma",
        ],
      },
      {
        id: "991692c4-7d02-4666-8d31-933c4831768d",
        title: "Founder & Director",
        employmentPeriod: "03.2024 — present",
        employmentType: "Part-time",
        icon: "business",
        description: `- Lead and manage the company's strategy.
- Oversee technical teams and product development.
- Manage relationships with customers and partners.`,
        skills: ["Business Ownership", "Business Law", "Business Tax"],
      },
    ],
    isCurrentEmployer: true,
  },
];

export function WorkExperienceDemo() {
  return <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />;
}
```

## Installation

<CodeTabs>
  <TabsListInstallType />

  <TabsContent value="cli">
    ```bash
    npx shadcn add @ncdai/work-experience
    ```
  </TabsContent>

  <TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies</Step>

      ```bash
      npm install clsx tailwind-merge react-markdown lucide-react
      npm install -D @tailwindcss/typography tw-animate-css
      ```

      <Step>Add a cn helper</Step>

      ```ts title="lib/utils.ts" showLineNumbers
      import type { ClassValue } from "clsx";
      import { clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export const cn = (...inputs: ClassValue[]) => {
        return twMerge(clsx(inputs));
      };

      ```

      <Step>Add plugin for tailwindcss</Step>

      ```css title="globals.css" showLineNumbers {2,3}
      @import "tailwindcss";
      @import "tw-animate-css";
      @plugin "@tailwindcss/typography";
      ```

      <Step>Copy and paste the following code into your project</Step>

      ```tsx title="components/work-experience.tsx" showLineNumbers
      import {
        BriefcaseBusinessIcon,
        ChevronsDownUpIcon,
        ChevronsUpDownIcon,
        CodeXmlIcon,
        DraftingCompassIcon,
        GraduationCapIcon,
      } from "lucide-react";
      import Image from "next/image";
      import React from "react";
      import ReactMarkdown from "react-markdown";

      import {
        Collapsible,
        CollapsibleContent,
        CollapsibleTrigger,
      } from "@/components/ui/collapsible";
      import { Separator } from "@/components/ui/separator";
      import { cn } from "@/lib/utils";

      const iconMap = {
        code: CodeXmlIcon,
        design: DraftingCompassIcon,
        business: BriefcaseBusinessIcon,
        education: GraduationCapIcon,
      } as const;

      /**
       * Represents the valid keys of the `iconMap` object, used to specify the type of icon
       * associated with an experience position.
       */
      export type ExperiencePositionIconType = keyof typeof iconMap;

      export type ExperiencePositionItemType = {
        /** Unique identifier for the position */
        id: string;
        /** The job title or position name */
        title: string;
        /** The period during which the position was held (e.g., "Jan 2020 - Dec 2021") */
        employmentPeriod: string;
        /** The type of employment (e.g., "Full-time", "Part-time", "Contract") */
        employmentType?: string;
        /** A brief description of the position or responsibilities */
        description?: string;
        /** An icon representing the position */
        icon?: ExperiencePositionIconType;
        /** A list of skills associated with the position */
        skills?: string[];
        /** Indicates if the position details are expanded in the UI */
        isExpanded?: boolean;
      };

      export type ExperienceItemType = {
        /** Unique identifier for the experience item */
        id: string;
        /** Name of the company where the experience was gained */
        companyName: string;
        /** URL or path to the company's logo image */
        companyLogo?: string;
        /** List of positions held at the company */
        positions: ExperiencePositionItemType[];
        /** Indicates if this is the user's current employer */
        isCurrentEmployer?: boolean;
      };

      export function WorkExperience({
        className,
        experiences,
      }: {
        className?: string;
        experiences: ExperienceItemType[];
      }) {
        return (
          <div className={cn("bg-background px-4", className)}>
            {experiences.map((experience) => (
              <ExperienceItem key={experience.id} experience={experience} />
            ))}
          </div>
        );
      }

      export function ExperienceItem({
        experience,
      }: {
        experience: ExperienceItemType;
      }) {
        return (
          <div className="space-y-4 py-4">
            <div className="not-prose flex items-center gap-3">
              <div
                className="flex size-6 shrink-0 items-center justify-center"
                aria-hidden
              >
                {experience.companyLogo ? (
                  <Image
                    src={experience.companyLogo}
                    alt={experience.companyName}
                    width={24}
                    height={24}
                    quality={100}
                    className="rounded-full"
                    unoptimized
                  />
                ) : (
                  <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                )}
              </div>

              <h3 className="text-lg leading-snug font-medium text-foreground">
                {experience.companyName}
              </h3>

              {experience.isCurrentEmployer && (
                <span className="relative flex items-center justify-center">
                  <span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-info" />
                  <span className="sr-only">Current Employer</span>
                </span>
              )}
            </div>

            <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
              {experience.positions.map((position) => (
                <ExperiencePositionItem key={position.id} position={position} />
              ))}
            </div>
          </div>
        );
      }

      export function ExperiencePositionItem({
        position,
      }: {
        position: ExperiencePositionItemType;
      }) {
        const ExperienceIcon = iconMap[position.icon || "business"];

        return (
          <Collapsible defaultOpen={position.isExpanded} asChild>
            <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
              <CollapsibleTrigger
                className={cn(
                  "group not-prose block w-full text-left select-none",
                  "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:rounded-lg hover:before:bg-muted/50"
                )}
              >
                <div className="relative z-1 mb-1 flex items-center gap-3">
                  <div
                    className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
                    aria-hidden
                  >
                    <ExperienceIcon className="size-4" />
                  </div>

                  <h4 className="flex-1 text-base font-medium text-balance text-foreground">
                    {position.title}
                  </h4>

                  <div
                    className="shrink-0 text-muted-foreground [&_svg]:size-4"
                    aria-hidden
                  >
                    <ChevronsDownUpIcon className="hidden group-data-[state=open]:block" />
                    <ChevronsUpDownIcon className="hidden group-data-[state=closed]:block" />
                  </div>
                </div>

                <div className="relative z-1 flex items-center gap-2 pl-9 text-sm text-muted-foreground">
                  {position.employmentType && (
                    <>
                      <dl>
                        <dt className="sr-only">Employment Type</dt>
                        <dd>{position.employmentType}</dd>
                      </dl>

                      <Separator
                        className="data-[orientation=vertical]:h-4"
                        orientation="vertical"
                      />
                    </>
                  )}

                  <dl>
                    <dt className="sr-only">Employment Period</dt>
                    <dd>{position.employmentPeriod}</dd>
                  </dl>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                {position.description && (
                  <Prose className="pt-2 pl-9">
                    <ReactMarkdown>{position.description}</ReactMarkdown>
                  </Prose>
                )}
              </CollapsibleContent>

              {Array.isArray(position.skills) && position.skills.length > 0 && (
                <ul className="not-prose flex flex-wrap gap-1.5 pt-3 pl-9">
                  {position.skills.map((skill, index) => (
                    <li key={index} className="flex">
                      <Skill>{skill}</Skill>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Collapsible>
        );
      }

      function Prose({ className, ...props }: React.ComponentProps<"div">) {
        return (
          <div
            className={cn(
              "prose prose-sm max-w-none font-mono text-foreground prose-zinc dark:prose-invert",
              "prose-a:font-medium prose-a:wrap-break-word prose-a:text-foreground prose-a:underline prose-a:underline-offset-4",
              "prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
              className
            )}
            {...props}
          />
        );
      }

      function Skill({ className, ...props }: React.ComponentProps<"span">) {
        return (
          <span
            className={cn(
              "inline-flex items-center rounded-lg border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground",
              className
            )}
            {...props}
          />
        );
      }

      ```

      <Step>Update the import paths to match your project setup</Step>
    </Steps>

  </TabsContent>
</CodeTabs>

## Usage

```tsx
import { WorkExperience } from "@/components/ncdai/work-experience";
import type { ExperienceItemType } from "@/components/ncdai/work-experience";
```

<CodeCollapsibleWrapper>
  ```tsx
  const WORK_EXPERIENCE: ExperienceItemType[] = [
    {
      id: "1",
      companyName: "Acme Inc.",
      companyLogo: "https://assets.chanhdai.com/images/companies/quaric.svg",
      isCurrentEmployer: true,
      positions: [
        {
          id: "1-1",
          title: "Senior Software Engineer",
          employmentPeriod: "Jan 2022 - Present",
          employmentType: "Full-time",
          description:
            "Leading a team of developers to build scalable web applications.",
          icon: "code",
          skills: ["JavaScript", "React", "Node.js"],
          isExpanded: true,
        },
        {
          id: "1-2",
          title: "Software Engineer",
          employmentPeriod: "Jan 2020 - Dec 2021",
          employmentType: "Full-time",
          description:
            "Developed and maintained web applications using modern technologies.",
          icon: "code",
          skills: ["HTML", "CSS", "JavaScript"],
        },
      ],
    },
  ];
  ```
</CodeCollapsibleWrapper>

```tsx
<WorkExperience experiences={WORK_EXPERIENCE} />
```

## Props

Props for the `WorkExperience` component:

| Prop          | Type                   | Description                                                                                          |
| ------------- | ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `experiences` | `ExperienceItemType[]` | An array of work experience items to display. Each item includes company details and positions held. |
| `className`   | `string`               | Additional CSS classes to apply to the root element.                                                 |

## Types

```ts
type ExperiencePositionIconType = "design" | "code" | "business" | "education";

type ExperiencePositionItemType = {
  /** Unique identifier for the position */
  id: string;
  /** The job title or position name */
  title: string;
  /** The period during which the position was held (e.g., "Jan 2020 - Dec 2021") */
  employmentPeriod: string;
  /** The type of employment (e.g., "Full-time", "Part-time", "Contract") */
  employmentType?: string;
  /** A brief description of the position or responsibilities */
  description?: string;
  /** An icon representing the position */
  icon?: ExperiencePositionIconType;
  /** A list of skills associated with the position */
  skills?: string[];
  /** Indicates if the position details are expanded in the UI */
  isExpanded?: boolean;
};

type ExperienceItemType = {
  /** Unique identifier for the experience item */
  id: string;
  /** Name of the company where the experience was gained */
  companyName: string;
  /** URL or path to the company's logo image */
  companyLogo?: string;
  /** List of positions held at the company */
  positions: ExperiencePositionItemType[];
  /** Indicates if this is the user's current employer */
  isCurrentEmployer?: boolean;
};
```

Last updated on December 27, 2025
