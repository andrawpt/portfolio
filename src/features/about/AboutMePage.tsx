import { ProfileHero } from "./components/ProfileHero";
import { BioRevealSection } from "./components/BioRevealSection";
import { SkillsSection } from "./components/SkillsSection";
import type { AboutMePageProps } from "./types";

export function AboutMePage({ onOpenContact }: AboutMePageProps) {
  return (
    <div className="relative min-h-screen w-full bg-transparent text-neutral-900 dark:text-white font-sans overflow-visible pt-10 sm:pt-12 pb-20 sm:pb-24 px-4 sm:px-10 md:px-16 lg:px-24 transition-colors duration-500">
      <div className="relative z-10 max-w-6xl mx-auto space-y-12 sm:space-y-20">
        <ProfileHero onOpenContact={onOpenContact} />
        <BioRevealSection />
        <SkillsSection />
      </div>
    </div>
  );
}

export default AboutMePage;
