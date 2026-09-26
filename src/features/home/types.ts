import type { ComponentType } from "react";
import type { IconProps } from "@tabler/icons-react";

export type CardId = "about" | "projects" | "experiences";

export interface ModalContent {
  heading: string;
  highlights: string[];
  details: string;
}

export interface HomeCardItem {
  id: CardId;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ComponentType<IconProps>;
  accentColor: string;
  badgeBg: string;
  badges: string[];
  modalContent: ModalContent;
}

export interface ThreeCardsSectionProps {
  onOpenAboutPage?: () => void;
  onOpenProjectsPage?: () => void;
  onOpenExperiencePage?: () => void;
}
