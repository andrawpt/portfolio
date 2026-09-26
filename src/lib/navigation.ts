import type { NavSection } from "@/types/navigation";

export const CARD_NAV_ITEMS: NavSection[] = [
  {
    label: "About",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "About Me", href: "#about", ariaLabel: "About Me" },
      { label: "Experience & Timeline", href: "#experience", ariaLabel: "Experience" },
      { label: "Certifications", href: "#experience", ariaLabel: "Certifications" },
    ],
  },
  {
    label: "Explore",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Projects", href: "#projects", ariaLabel: "Featured Projects" },
      { label: "Experience", href: "#experience", ariaLabel: "Experience & Timeline" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#271E37",
    textColor: "#fff",
    links: [
      { label: "Contact Me", href: "#contact", ariaLabel: "Contact Me" },
      { label: "Email", href: "mailto:andrawpt@gmail.com", ariaLabel: "Email Andra" },
      { label: "LinkedIn", href: "https://linkedin.com/in/andrawpt", ariaLabel: "LinkedIn" },
      { label: "GitHub", href: "https://github.com/andrawpt", ariaLabel: "GitHub" },
    ],
  },
];
