import type { IconType } from "react-icons";

export type ProjectCategory =
  | "AI & Deep Learning"
  | "Gen-AI & LLMs"
  | "Data Science"
  | "Computer Vision";

export type ProjectStatus = "LIVE MODEL" | "FEATURED R&D" | "PRODUCTION API";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectModalContent {
  heading: string;
  overview: string;
  highlights: string[];
  metrics?: ProjectMetric[];
}

export interface ProjectItem {
  id: string;
  category: ProjectCategory;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  badgeBg: string;
  badges: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: ProjectStatus;
  modalContent: ProjectModalContent;
}

export interface TechLogoItem {
  name: string;
  icon: IconType;
  color: string;
}

export interface ProjectsShowcaseProps {
  onBack?: () => void;
}
