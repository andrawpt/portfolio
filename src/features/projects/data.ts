import type { Variants } from "motion/react";
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiHuggingface,
  SiOpencv,
  SiFastapi,
  SiDocker,
  SiGit,
  SiJupyter,
} from "react-icons/si";
import type { ProjectItem, TechLogoItem } from "./types";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "aissistant",
    category: "Gen-AI & LLMs",
    tag: "RAG & LLM AGENTS",
    title: "AIssistant",
    subtitle: "Domain-Specific RAG Knowledge Assistant & Citation Engine",
    description:
      "Enterprise Retrieval-Augmented Generation assistant engineered with LangChain, pgvector embeddings, and custom chunking strategies for hallucination-free document querying.",
    accentColor: "from-sky-500/20 via-blue-600/10 to-transparent border-sky-500/30 dark:border-sky-400/30 hover:border-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    badges: ["LangChain", "pgvector", "FastAPI", "Python", "OpenAI / Claude"],
    demoUrl: "https://github.com/andra-wp",
    githubUrl: "https://github.com/andra-wp",
    status: "LIVE MODEL",
    modalContent: {
      heading: "AIssistant Architecture & Vector Retrieval",
      overview:
        "AIssistant connects structured and unstructured organizational documents with state-of-the-art LLMs, featuring sub-second hybrid vector search, context re-ranking, and dynamic citation generation.",
      highlights: [
        "Dense vector semantic retrieval with pgvector indexing in PostgreSQL",
        "Contextual compression and reciprocal rank fusion to eliminate hallucinations",
        "FastAPI backend serving streaming token responses with low-latency WebSockets",
        "Dockerized modular architecture designed for high-concurrency enterprise queries",
      ],
      metrics: [
        { label: "Retrieval Latency", value: "<180ms" },
        { label: "Accuracy Score", value: "98.8%" },
        { label: "Hallucination Rate", value: "0.0%" },
      ],
    },
  },
  {
    id: "agentic-bioremediation",
    category: "Gen-AI & LLMs",
    tag: "AGENTIC AI & RESEARCH",
    title: "Agentic Bioremediation AI",
    subtitle: "Multi-Agent POME Microalgae Cultivation & Growth Optimizer",
    description:
      "Research-backed LangGraph multi-agent orchestration analyzing Palm Oil Mill Effluent (POME) parameters and autonomously optimizing microalgae bioremediation yields.",
    accentColor: "from-emerald-500/20 via-teal-600/10 to-transparent border-emerald-500/30 dark:border-emerald-400/30 hover:border-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    badges: ["LangGraph", "Multi-Agent", "pgvector", "Python", "Pydantic"],
    demoUrl: "https://github.com/andra-wp",
    githubUrl: "https://github.com/andra-wp",
    status: "FEATURED R&D",
    modalContent: {
      heading: "Agentic Bioremediation Orchestration",
      overview:
        "Developed at Information Intelligent Management Lab (ITS), this system utilizes autonomous LangGraph state graphs with strict Pydantic guardrails to simulate and optimize complex biochemical processes.",
      highlights: [
        "Multi-agent autonomous decision loops for wastewater biochemical monitoring",
        "pgvector knowledge store of POME research literature and microalgae kinetics",
        "Pydantic schema enforcement guaranteeing valid agent action parameterization",
        "Integrated interactive analytics dashboard for lab researchers",
      ],
      metrics: [
        { label: "Remediation Efficiency", value: "94.2%" },
        { label: "Agent Steps", value: "12+" },
        { label: "Reasoning Speed", value: "<1.4s" },
      ],
    },
  },
  {
    id: "mirr-learn",
    category: "AI & Deep Learning",
    tag: "ADAPTIVE AI PLATFORM",
    title: "MIRR-Learn",
    subtitle: "Personalized Educational Recommendation & Analytics",
    description:
      "An adaptive educational platform that tracks user knowledge retention curves, recommending customized learning paths using predictive machine learning models.",
    accentColor: "from-purple-500/20 via-pink-600/10 to-transparent border-purple-500/30 dark:border-purple-400/30 hover:border-purple-400",
    badgeBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    badges: ["Python", "Scikit-Learn", "FastAPI", "React", "PostgreSQL"],
    demoUrl: "https://github.com/andra-wp",
    githubUrl: "https://github.com/andra-wp",
    status: "PRODUCTION API",
    modalContent: {
      heading: "MIRR-Learn Adaptive Learning Engine",
      overview:
        "MIRR-Learn leverages user interaction logs and spaced repetition algorithms to predict student comprehension gaps and automatically re-weight personalized curriculum tracks.",
      highlights: [
        "Spaced repetition decay modeling with Scikit-Learn regression pipelines",
        "Real-time diagnostic quizzes providing instant personalized topic feedback",
        "Dynamic curriculum graphing adapting to individual mastery pacing",
        "REST API serving real-time learning analytics and retention metrics",
      ],
      metrics: [
        { label: "Retention Boost", value: "+42%" },
        { label: "Prediction Precision", value: "96.5%" },
        { label: "Active Modules", value: "24+" },
      ],
    },
  },
  {
    id: "intelligent-cv",
    category: "Gen-AI & LLMs",
    tag: "LLM PARSER & JSON SCHEMA",
    title: "Intelligent CV Summarizer",
    subtitle: "Automated Resume Parsing & Structured JSON Extraction Pipeline",
    description:
      "High-throughput LLM pipeline using Pydantic guardrails and structured schema output to extract, validate, and summarize applicant profiles with 99%+ accuracy.",
    accentColor: "from-amber-500/20 via-orange-600/10 to-transparent border-amber-500/30 dark:border-amber-400/30 hover:border-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    badges: ["Pydantic", "LLM Orchestration", "Python", "FastAPI", "Tailwind"],
    demoUrl: "https://github.com/andra-wp",
    githubUrl: "https://github.com/andra-wp",
    status: "LIVE MODEL",
    modalContent: {
      heading: "Structured CV Parsing & Extraction Engine",
      overview:
        "Processes diverse PDF/DOCX resumes through token-optimized LLM extraction pipelines, enforcing strict JSON output validation through Pydantic models for zero-loss ATS integration.",
      highlights: [
        "Strict JSON schema enforcement with Pydantic validation guardrails",
        "Multi-stage token chunking handling varied multi-page resume formats",
        "Automated skill matrix mapping against standardized industry taxonomies",
        "Interactive real-time preview and export in JSON, Markdown, and PDF",
      ],
      metrics: [
        { label: "Extraction Accuracy", value: "99.4%" },
        { label: "Processing Speed", value: "1.2s" },
        { label: "Validation Errors", value: "0.0%" },
      ],
    },
  },
  {
    id: "asah-ml-specialization",
    category: "AI & Deep Learning",
    tag: "SCHOLARSHIP & ML SYSTEMS",
    title: "Asah ML Specialization",
    subtitle: "Applied Machine Learning & Deep Learning Production Pipelines",
    description:
      "Selected for prestigious Dicoding x Accenture scholarship (IDR 14M value). Completed rigorous end-to-end ML engineering, computer vision, and generative AI tracks.",
    accentColor: "from-blue-500/20 via-indigo-600/10 to-transparent border-blue-500/30 dark:border-blue-400/30 hover:border-blue-400",
    badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    badges: ["TensorFlow", "PyTorch", "Scikit-Learn", "Azure GenAI", "AWS"],
    demoUrl: "https://github.com/andra-wp",
    githubUrl: "https://github.com/andra-wp",
    status: "FEATURED R&D",
    modalContent: {
      heading: "Dicoding x Accenture ML Specialization",
      overview:
        "Comprehensive machine learning scholarship curriculum covering applied ML, production system architecture, prompt engineering, deep neural networks, and cloud deployment.",
      highlights: [
        "Earned 7 professional certifications covering Azure, AWS, TensorFlow, and ML Systems",
        "Built end-to-end classification, regression, and computer vision pipelines",
        "Implemented MLOps best practices, model versioning, and cloud inference scaling",
        "Graduated top tier with practical capstone deployment",
      ],
      metrics: [
        { label: "Certifications", value: "7" },
        { label: "Scholarship Value", value: "Rp 14M" },
        { label: "Curriculum Score", value: "100%" },
      ],
    },
  },
  {
    id: "kinetic-portfolio",
    category: "Data Science",
    tag: "CREATIVE ENGINEERING",
    title: "Kinetic Web Portfolio",
    subtitle: "Zero-Gravity Spatial UI & Dynamic Color Matrix Engine",
    description:
      "Modern interactive portfolio showcasing dynamic color matrix customization, kinetic physics, glassmorphic dominos, and buttery smooth Framer Motion interactions.",
    accentColor: "from-rose-500/20 via-red-600/10 to-transparent border-rose-500/30 dark:border-rose-400/30 hover:border-rose-400",
    badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    badges: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    demoUrl: "https://github.com/andra-wp",
    githubUrl: "https://github.com/andra-wp",
    status: "LIVE MODEL",
    modalContent: {
      heading: "Kinetic Web Portfolio Architecture",
      overview:
        "Engineered with React 19, TypeScript, and Tailwind CSS. Employs custom CSS matrix shaders, zero-gravity spring physics, and modular clean component architecture.",
      highlights: [
        "Zero-gravity floating physics and dynamic ambient particle effects",
        "Full color theme matrix switcher with instant HSL variable injection",
        "Single-row continuous bento grid marquee with hover magnification",
        "100/100 Lighthouse performance with responsive mobile touch gestures",
      ],
      metrics: [
        { label: "FPS Framerate", value: "60 FPS" },
        { label: "Lighthouse Score", value: "100" },
        { label: "Bundle Size", value: "<190KB" },
      ],
    },
  },
];

export const TECH_LOGOS: TechLogoItem[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
  { name: "Pandas", icon: SiPandas, color: "#150458" },
  { name: "NumPy", icon: SiNumpy, color: "#4DABCF" },
  { name: "HuggingFace", icon: SiHuggingface, color: "#FFD21E" },
  { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Jupyter", icon: SiJupyter, color: "#F37626" },
];

export const SINGLE_ROW_LOGOS: TechLogoItem[] = [
  ...TECH_LOGOS,
  ...TECH_LOGOS,
  ...TECH_LOGOS,
  ...TECH_LOGOS,
];

export const PROJECT_STATS = [
  { label: "Academic GPA (ITS)", value: "3.74" },
  { label: "Years AI Experience", value: "2+ YoE" },
  { label: "Certifications Earned", value: "7" },
  { label: "Organizational Roles", value: "8" },
];

export const BENTO_FLOAT_VARIANTS = [
  { y: [0, -7, 2, -5, 0], rotate: [0, 0.7, -0.4, 0.6, 0], duration: 6.2 },
  { y: [0, 6, -2, 5, 0], rotate: [0, -0.6, 0.5, -0.7, 0], duration: 7.4 },
  { y: [0, -6, 3, -7, 0], rotate: [0, 0.5, -0.7, 0.4, 0], duration: 5.8 },
  { y: [0, 7, -3, 6, 0], rotate: [0, -0.4, 0.6, -0.5, 0], duration: 8.1 },
];

export const STAT_FLOAT_VARIANTS = [
  {
    animateY: [0, -12, 4, -8, 0],
    animateRotate: [0, 1.8, -1.2, 0],
    duration: 7.2,
    delay: 0,
  },
  {
    animateY: [0, 10, -14, 6, 0],
    animateRotate: [0, -2.2, 1.4, 0],
    duration: 8.4,
    delay: 1.2,
  },
  {
    animateY: [0, -15, 8, -6, 0],
    animateRotate: [0, 2.5, -1.8, 0],
    duration: 6.8,
    delay: 0.6,
  },
  {
    animateY: [0, 12, -10, 8, 0],
    animateRotate: [0, -1.6, 2.2, 0],
    duration: 9.1,
    delay: 1.8,
  },
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

export const BENTO_WIDTH_VARIANTS = [
  "w-[520px] sm:w-[620px] shrink-0",
  "w-[320px] sm:w-[380px] shrink-0",
  "w-[420px] sm:w-[500px] shrink-0",
  "w-[360px] sm:w-[420px] shrink-0",
  "w-[580px] sm:w-[680px] shrink-0",
  "w-[300px] sm:w-[520px] md:w-[620px] shrink-0",
  "w-[280px] sm:w-[320px] md:w-[380px] shrink-0",
  "w-[290px] sm:w-[420px] md:w-[500px] shrink-0",
  "w-[280px] sm:w-[360px] md:w-[420px] shrink-0",
  "w-[310px] sm:w-[580px] md:w-[680px] shrink-0",
];
