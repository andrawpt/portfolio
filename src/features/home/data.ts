import { IconUser, IconCode, IconBriefcase } from "@tabler/icons-react";
import type { HomeCardItem } from "./types";

export const CARDS_DATA: HomeCardItem[] = [
  {
    id: "about",
    tag: "WHO I AM",
    title: "About Me",
    subtitle: "AI Engineer & ITS Informatics",
    description:
      "Informatics student at ITS (GPA 3.74) with 2 years of hands-on experience architecting autonomous agentic AI, deterministic RAG pipelines, and high-impact machine learning systems.",
    icon: IconUser,
    accentColor: "from-neutral-900/10 to-neutral-800/10 border-neutral-900/20 dark:border-white/15 hover:border-black dark:hover:border-white",
    badgeBg: "bg-neutral-900/5 dark:bg-white/10 text-neutral-900 dark:text-white border-neutral-900/15 dark:border-white/20",
    badges: ["AI Engineer", "ITS Informatics", "GPA 3.74 / 4.00"],
    modalContent: {
      heading: "Kadek Andra Wikanjaya Putra",
      details:
        "Informatics student at Institut Teknologi Sepuluh Nopember with 2 years of hands-on experience as an AI Engineer, specializing in building end-to-end intelligent solutions. Skilled in architecting RAG workflows, LLM orchestration, and machine learning pipelines with a deep focus on complex data analysis and system optimization. Combines a rigorous technical foundation with strong interests in strategic thinking and managerial development to deliver impactful AI-driven solutions across diverse industries.",
      highlights: [
        "2 Years of hands-on experience as an AI Engineer & Researcher",
        "Bachelor of Informatics Engineering at ITS (GPA: 3.74 / 4.00)",
        "Research Assistant at Information Intelligent Management Lab (IIM Lab ITS)",
        "Awarded Dicoding x Accenture ML Specialization Scholarship (IDR 14,000,000 value)",
        "General Secretary & HR Staff at UKM Musik ITS (+60% administrative turnaround)",
        "Project Manager & Delegate at AIESEC Future Leaders ('Noona' project)",
        "Vice Project Officer at HMTC ITS (Directed 50+ staff for 300+ graduates)",
        "Expert Staff Data Coordination Officer at Schematics ITS (1,000+ records)",
        "7 Professional Certifications across Azure Gen-AI, AWS, and ML Systems",
      ],
    },
  },
  {
    id: "projects",
    tag: "FEATURED WORK",
    title: "Projects",
    subtitle: "Agentic AI, RAG & ML Pipelines",
    description:
      "Production RAG assistants, microalgae bioremediation multi-agents, adaptive learning engines, and automated structured resume parsers.",
    icon: IconCode,
    accentColor: "from-neutral-900/10 to-neutral-800/10 border-neutral-900/20 dark:border-white/15 hover:border-black dark:hover:border-white",
    badgeBg: "bg-neutral-900/5 dark:bg-white/10 text-neutral-900 dark:text-white border-neutral-900/15 dark:border-white/20",
    badges: ["LangGraph & RAG", "AIssistant", "MIRR-Learn"],
    modalContent: {
      heading: "Engineering & R&D Projects",
      details:
        "Portfolio of real-world AI applications including multi-agent environmental models, enterprise knowledge retrieval, and predictive analytics platforms.",
      highlights: [
        "AIssistant: RAG Knowledge Assistant with pgvector & citation verification",
        "Agentic Bioremediation AI: LangGraph multi-agent microalgae optimizer",
        "MIRR-Learn: Adaptive learning platform with personalized spaced retention",
        "Intelligent CV Summarizer: Pydantic structured resume extraction pipeline",
      ],
    },
  },
  {
    id: "experiences",
    tag: "MY JOURNEY",
    title: "Experiences",
    subtitle: "Research Lab & Organization Leadership",
    description:
      "Research Assistant at IIM Lab ITS, General Secretary at UKM Musik ITS, Project Manager at AIESEC Future Leaders, and HMTC ITS leadership.",
    icon: IconBriefcase,
    accentColor: "from-neutral-900/10 to-neutral-800/10 border-neutral-900/20 dark:border-white/15 hover:border-black dark:hover:border-white",
    badgeBg: "bg-neutral-900/5 dark:bg-white/10 text-neutral-900 dark:text-white border-neutral-900/15 dark:border-white/20",
    badges: ["IIM Lab ITS", "UKM Musik ITS", "AIESEC Leader"],
    modalContent: {
      heading: "Research, Industry & Leadership Roles",
      details:
        "Track record in academic AI research, large-scale event operations, organizational governance, and cross-functional team management.",
      highlights: [
        "Research Assistant at Information Intelligent Management Lab ITS",
        "General Secretary & HR Staff at UKM Musik ITS (+60% SOP turnaround)",
        "Project Manager at AIESEC Future Leaders ('Noona' project)",
        "Vice Project Officer at HMTC ITS (50+ staff, 300+ graduates)",
      ],
    },
  },
];

export const FLOAT_CONFIGS = [
  {
    y: [0, -15, 2, -10, 0],
    rotate: [0, 1.5, -0.8, 1.0, 0],
    duration: 6.2,
  },
  {
    y: [0, 16, -4, 12, 0],
    rotate: [0, -1.2, 1.0, -1.5, 0],
    duration: 7.4,
  },
  {
    y: [0, -12, 4, -16, 0],
    rotate: [0, 1.0, -1.4, 0.8, 0],
    duration: 5.8,
  },
];

export const BASE_STACK = [
  { zIndex: 30 },
  { zIndex: 20 },
  { zIndex: 10 },
];
