import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiFastapi,
  SiDocker,
  SiReact,
  SiTypescript,
  SiPostgresql,
  SiScikitlearn,
  SiGit,
  SiLinux,
  SiTailwindcss,
} from "react-icons/si";
import type { Variants } from "motion/react";
import type {
  ExperienceItem,
  CertificationItem,
  TechSkillIcon,
  ExperienceStatItem,
} from "./types";

export const EXPERIENCE_STATS: ExperienceStatItem[] = [
  { label: "GPA / Academic", value: "3.74" },
  { label: "AI & ML Experience", value: "2+ YoE" },
  { label: "Dicoding Certifications", value: "7" },
  { label: "Workflow Efficiency", value: "+60%" },
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "research-assistant-iim",
    category: "AI & ML",
    tag: "AGENTIC AI & RAG RESEARCH",
    role: "Research Assistant (Agentic AI & RAG)",
    company: "Information Intelligent Management - Surabaya, Indonesia",
    location: "Surabaya, Indonesia",
    period: "Sept 2026 – Present",
    type: "Research",
    description:
      "Designing a closed-loop agentic AI architecture using LangGraph to concurrently process IoT sensor streams and optical camera feeds for microalgae bioremediation in POME, backed by pgvector RAG and Pydantic validation guardrails.",
    badges: ["LangGraph", "pgvector", "Pydantic", "Computer Vision", "IoT Sensors", "RAG"],
  },
  {
    id: "ukm-musik-its",
    category: "Leadership",
    tag: "ORGANIZATIONAL LEADERSHIP & WORKFLOWS",
    role: "General Secretary & Staff of HR",
    company: "UKM Musik ITS - Surabaya, Indonesia",
    location: "Surabaya, Indonesia",
    period: "Mar 2025 – Present",
    type: "Organization",
    description:
      "Designed an automated correspondence tracking system improving turnaround efficiency by 60%, conducted protocol workshops for 50+ staff, and coordinated rehearsal scheduling for 100+ musicians.",
    badges: ["Workflow Automation", "60% Efficiency Gain", "50+ Staff Training", "Operations"],
  },
  {
    id: "aiesec-future-leaders",
    category: "Leadership",
    tag: "PROJECT MANAGEMENT & STRATEGY",
    role: "Project Manager & Delegate",
    company: "AIESEC Future Leaders - Surabaya, Indonesia",
    location: "Surabaya, Indonesia",
    period: "Apr 2025 – Jun 2025",
    type: "Organization",
    description:
      "Spearheaded planning and execution of capstone business case project 'Noona' for women's dysmenorrhea relief, served as strategic bridge to stakeholders, and applied human-centric UN SDGs frameworks.",
    badges: ["Project Manager", "Product Strategy", "Pitch Defense", "UN SDGs"],
  },
  {
    id: "hmtc-its",
    category: "Leadership",
    tag: "EVENT MANAGEMENT & MEDIA LEAD",
    role: "Vice Project Officer, Pubdok Head & Internal Affairs",
    company: "Himpunan Mahasiswa Teknik Computer-Informatika ITS",
    location: "Surabaya, Indonesia",
    period: "Mar 2026 – Present",
    type: "Organization",
    description:
      "Directed committee of 50+ staff coordinating graduation ceremonies for 300+ graduates, standardized cross-divisional design SOPs, and organized student community benchmarking sessions.",
    badges: ["Vice Project Officer", "50+ Staff Committee", "300+ Graduates", "Media SOPs", "Internal Affairs"],
  },
  {
    id: "schematics-its",
    category: "Full-Stack",
    tag: "DATA MANAGEMENT & LOGISTICS",
    role: "Expert Staff of Data Coordination Officer",
    company: "Schematics ITS - Surabaya, Indonesia",
    location: "Surabaya, Indonesia",
    period: "May 2026 – Present",
    type: "Organization",
    description:
      "Architected and managed centralized databases to process, validate, and structure records for 1,000+ national competition participants, synchronizing tracking pipelines across event divisions.",
    badges: ["Database Architecture", "Data Validation", "1,000+ Records", "Technical Support"],
  },
  {
    id: "its-degree",
    category: "Education",
    tag: "ACADEMIC EXCELLENCE (GPA: 3.74 / 4.00)",
    role: "Bachelor of Informatics Engineering",
    company: "Institut Teknologi Sepuluh Nopember (ITS) - Surabaya, Indonesia",
    location: "Surabaya, Indonesia",
    period: "Aug 2024 – Present",
    type: "Degree",
    description:
      "Bachelor of Informatics Engineering focusing on Artificial Intelligence, Machine Learning, Data Structures & Algorithms, Database Systems, Computer Networks, and Operating Systems with GPA 3.74 / 4.00.",
    badges: ["GPA: 3.74 / 4.00", "Artificial Intelligence", "Machine Learning", "Data Structures", "Algorithms"],
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Building Generative AI Applications with Microsoft Azure",
    issuer: "Dicoding Indonesia",
    year: "Jan 2026",
    categoryBadge: "Generative AI",
    skills: ["Microsoft Azure", "Generative AI", "Azure OpenAI", "ID: N9ZO2860RPG5"],
  },
  {
    id: "cert-2",
    title: "Prompt Engineering for Software Developers",
    issuer: "Dicoding Indonesia",
    year: "Jan 2026",
    categoryBadge: "AI Engineering",
    skills: ["Prompt Engineering", "LLMs", "Structured Prompts", "ID: 0LZ05LLONX65"],
  },
  {
    id: "cert-3",
    title: "Applied Machine Learning",
    issuer: "Dicoding Indonesia",
    year: "Jan 2026",
    categoryBadge: "Machine Learning",
    skills: ["Supervised ML", "Model Evaluation", "Scikit-Learn", "ID: 4EXG3DKEDZRL"],
  },
  {
    id: "cert-4",
    title: "Building Machine Learning Systems",
    issuer: "Dicoding Indonesia",
    year: "Dec 2025",
    categoryBadge: "ML Systems",
    skills: ["ML Architecture", "Data Pipelines", "Production ML", "ID: 53XEK52QKXRN"],
  },
  {
    id: "cert-5",
    title: "Fundamentals of Deep Learning",
    issuer: "Dicoding Indonesia",
    year: "Aug 2025",
    categoryBadge: "Deep Learning",
    skills: ["Neural Networks", "Deep Learning", "Optimization", "ID: 1RXYQ4G0QZVM"],
  },
  {
    id: "cert-6",
    title: "DevOps Fundamentals",
    issuer: "Dicoding Indonesia",
    year: "Aug 2025",
    categoryBadge: "DevOps",
    skills: ["CI/CD Pipelines", "DevOps Culture", "Automation", "ID: JLX15LL45Z72"],
  },
  {
    id: "cert-7",
    title: "Cloud and Generative AI Fundamentals on AWS",
    issuer: "Dicoding Indonesia",
    year: "May 2025",
    categoryBadge: "AWS & Gen-AI",
    skills: ["AWS Cloud", "Generative AI", "Cloud Infrastructure", "ID: NVP75DYM4XR0"],
  },
];

export const TECH_SKILL_ICONS: TechSkillIcon[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "React", icon: SiReact, color: "#149ECA" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
];

export const KINETIC_ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.94,
    filter: "blur(12px)",
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
    y: -35,
    scale: 0.92,
    filter: "blur(12px)",
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
