import {
  IconBrain,
  IconRocket,
  IconCode,
  IconUsers,
  IconBulb,
  IconTarget,
} from "@tabler/icons-react";
import type { Variants } from "motion/react";
import type { SkillCategoryItem, AboutStatItem } from "./types";

export const ABOUT_STATS: AboutStatItem[] = [
  { label: "Academic GPA (ITS)", value: "3.74" },
  { label: "Years AI Experience", value: "2+" },
  { label: "Certifications Earned", value: "7" },
  { label: "Organizational Roles", value: "8" },
];

export const HARD_SKILL_CATEGORIES: SkillCategoryItem[] = [
  {
    title: "Generative AI & LLMs",
    subtitle: "Agents, RAG & Vector Retrieval",
    tag: "GEN-AI & LLM",
    icon: IconBrain,
    skills: [
      "LangGraph Agentic Multi-Agent",
      "pgvector Semantic Search & RAG",
      "Pydantic Guardrails & Validation",
      "Azure Gen-AI & Prompt Engineering",
      "Large Language Models (LLM Orchestration)",
    ],
  },
  {
    title: "Machine Learning & Data",
    subtitle: "Statistical Models & Deep Learning",
    tag: "ML & DATA ANALYSIS",
    icon: IconRocket,
    skills: [
      "Python, Scikit-Learn & ML Systems",
      "Deep Learning & Computer Vision",
      "Data Analysis, Pandas & NumPy",
      "Predictive Modeling & Benchmarking",
      "Data Structures & Algorithms (Coursework)",
    ],
  },
  {
    title: "Systems & Engineering",
    subtitle: "Web Architectures & Cloud DevOps",
    tag: "SYSTEMS & CLOUD",
    icon: IconCode,
    skills: [
      "SQL, PostgreSQL & Database Systems",
      "Python, FastAPI REST APIs & React",
      "Git Version Control & Workflows",
      "AWS Cloud & DevOps Fundamentals",
      "Operating Systems & Computer Networks",
    ],
  },
];

export const SOFT_SKILL_CATEGORIES: SkillCategoryItem[] = [
  {
    title: "Strategic Leadership",
    subtitle: "Governance & Operations",
    tag: "LEADERSHIP",
    icon: IconUsers,
    skills: [
      "General Secretary (UKM Musik ITS)",
      "Vice Project Officer (HMTC ITS)",
      "Staff Supervision & 50+ Team Alignment",
      "Strategic Decision-Making Support",
      "Cross-Disciplinary Direction",
    ],
  },
  {
    title: "Project Management",
    subtitle: "Execution & Collaboration",
    tag: "MANAGEMENT",
    icon: IconBulb,
    skills: [
      "Project Manager (AIESEC 'Noona')",
      "Cross-Functional Collaboration",
      "Stakeholder Pitch & Milestone Defense",
      "Event Operations for 300+ Attendees",
      "Agile Workflows & SOP Standardization",
    ],
  },
  {
    title: "Analytical Problem Solving",
    subtitle: "Rigor & Adaptability",
    tag: "PROBLEM SOLVING",
    icon: IconTarget,
    skills: [
      "Analytical Problem Solving",
      "High Adaptability in Tech & R&D",
      "Data Coordination (1,000+ Records)",
      "Scientific Research & Bio-AI Modeling",
      "Deterministic Guardrails & Precision",
    ],
  },
];

export const FLOAT_CONFIGS = [
  {
    y: [0, -10, 2, -6, 0],
    rotate: [0, 1.2, -0.6, 0.8, 0],
    duration: 6.2,
  },
  {
    y: [0, 8, -3, 6, 0],
    rotate: [0, -1.0, 0.8, -1.2, 0],
    duration: 7.4,
  },
  {
    y: [0, -8, 3, -10, 0],
    rotate: [0, 0.8, -1.0, 0.6, 0],
    duration: 5.8,
  },
];

export const BASE_STACK = [
  { zIndex: 30 },
  { zIndex: 20 },
  { zIndex: 10 },
];

export const KINETIC_ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 20,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: -25,
    scale: 0.94,
    filter: "blur(8px)",
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
