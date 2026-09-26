import type { ComponentType } from "react";
import type { IconBaseProps } from "react-icons";

export interface ExperienceItem {
  id: string;
  category: "AI & ML" | "Full-Stack" | "Leadership" | "Education";
  tag: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Full-Time" | "Internship" | "Research" | "Organization" | "Degree";
  description: string;
  badges: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string | number;
  categoryBadge: string;
  skills: string[];
}

export interface TechSkillIcon {
  name: string;
  icon: ComponentType<IconBaseProps>;
  color: string;
}

export interface ExperienceStatItem {
  label: string;
  value: string;
}

export interface ExperienceShowcaseProps {
  onBack?: () => void;
}
