import type { ReactNode } from "react";

export interface NavLinkItem {
  label: string;
  href: string;
  ariaLabel: string;
}

export interface NavSection {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLinkItem[];
}

export interface DockItem {
  title: string;
  icon: ReactNode;
  href: string;
  onClick?: (e?: any) => void;
  target?: string;
  rel?: string;
}
