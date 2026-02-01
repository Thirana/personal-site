import {
  Atom,
  Boxes,
  Braces,
  Cloud,
  Cog,
  FileCode,
  Github,
  Layers,
  Linkedin,
  Mail,
  Route,
  Server,
  Twitter,
} from "lucide-react";

export const profile = {
  name: "Thirana Embuldeniya",
  handle: "@_Thirana",
  headline:
    "I build modern, reliable web experiences with a focus on performance, clarity, and craft.",
  availableForWork: true,
};

export const socials = [
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/you", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/you", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com/you", icon: Twitter },
];

export const skills = [
  { label: "React", icon: Atom },
  { label: "NextJS", icon: Layers },
  { label: "Tanstack", icon: Boxes },
  { label: "NodeJS", icon: Server },
  { label: "Express", icon: Route },
  { label: "JavaScript", icon: Braces },
  { label: "TypeScript", icon: FileCode },
  { label: "AWS", icon: Cloud },
  { label: "DevOps", icon: Cog },
];
