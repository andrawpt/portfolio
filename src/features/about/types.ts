import type { ComponentType } from "react";
import type { IconProps } from "@tabler/icons-react";

export interface SkillCategoryItem {
  title: string;
  subtitle: string;
  tag: string;
  icon: ComponentType<IconProps>;
  skills: string[];
}

export interface AboutStatItem {
  label: string;
  value: string;
}

export interface AboutMePageProps {
  onBack?: () => void;
  onOpenContact: () => void;
}
