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
    "I am an organized, self-motivated software engineer with 1 year of industry experience. Hands-on practical experience in cloud-native systems, DevOps practices, and full-stack development. Experience working with AWS, Kubernetes-based platforms, and building web applications. Reliable team player with a strong willingness to learn and grow.",
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
