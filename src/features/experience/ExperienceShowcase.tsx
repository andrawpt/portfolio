import { useState } from "react";
import { motion } from "motion/react";
import { ScrollStack, ScrollStackItem } from "@/components/ui/ScrollStack";
import { CounterNumber } from "@/components/ui/CounterNumber";
import { MilestoneCard } from "./components/MilestoneCard";
import { CertificationsSlider } from "./components/CertificationsSlider";
import { ToolsFrameworksGrid } from "./components/ToolsFrameworksGrid";
import {
  EXPERIENCES_DATA,
  EXPERIENCE_STATS,
  KINETIC_ITEM_VARIANTS,
} from "./data";
import type { ExperienceShowcaseProps } from "./types";

export function ExperienceShowcase({ onBack: _onBack }: ExperienceShowcaseProps) {
  const [hoveredExpIndex, setHoveredExpIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen w-full bg-transparent text-neutral-900 dark:text-white font-sans overflow-x-hidden pt-6 sm:pt-8 pb-32 px-4 sm:px-10 md:px-16 lg:px-24 transition-colors duration-500">
      <div className="relative z-10 max-w-6xl mx-auto space-y-24 sm:space-y-36">
        <section
          className="min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between py-10 sm:py-16"
        >
          <div className="space-y-12 sm:space-y-16 my-auto">
            <div className="space-y-5 max-w-3xl text-center sm:text-left flex flex-col items-center sm:items-start mx-auto sm:mx-0">
              <motion.h1
                variants={KINETIC_ITEM_VARIANTS}
                className="text-3xl sm:text-6xl md:text-7xl font-black font-mono tracking-tight text-neutral-900 dark:text-white leading-[1.05] text-center sm:text-left"
              >
                My Professional &{" "}
                <span className="bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-300 dark:to-neutral-500 bg-clip-text text-transparent animate-shimmer-text inline-block">
                  Tech Journey
                </span>
              </motion.h1>

              <motion.p
                variants={KINETIC_ITEM_VARIANTS}
                className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl text-center sm:text-left"
              >
                Explore my track record in Agentic AI and RAG research, machine learning engineering, data coordination, and organizational leadership across ITS and international student organizations.
              </motion.p>
            </div>

            <motion.div
              variants={KINETIC_ITEM_VARIANTS}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2"
            >
              {EXPERIENCE_STATS.map((stat, idx) => {
                const statFloatClass = `float-stat-${idx % 4}`;
                return (
                  <div key={idx} className={`transform-gpu ${statFloatClass}`}>
                    <motion.div
                      whileHover={{ y: -12, scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 380, damping: 11, mass: 0.6 }}
                      className="relative p-6 sm:p-7 rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-neutral-900/50 border border-white/50 dark:border-white/15 shadow-lg text-center space-y-2 hover:border-black dark:hover:border-white hover:shadow-2xl transition-[border-color,box-shadow] duration-300 cursor-default group overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neutral-900/30 dark:via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="text-4xl sm:text-5xl font-mono font-black text-neutral-900 dark:text-white drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <CounterNumber value={stat.value} />
                      </div>
                      <div className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                        {stat.label}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Desktop View: Sequential ScrollStack */}
        <motion.section
          variants={KINETIC_ITEM_VARIANTS}
          id="experience-milestones-section-desktop"
          className="relative min-h-screen hidden md:flex flex-col justify-center py-12 sm:py-20"
        >
          <div className="space-y-6 w-full">
            <ScrollStack
              header={
                <div className="space-y-3 text-left py-2 max-w-full">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-black text-neutral-900 dark:text-white tracking-tight">
                    Career Timeline & Milestones
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans max-w-2xl">
                    Scroll down to stack each milestone card sequentially in the center view.
                  </p>
                </div>
              }
              headerPosition={350}
              stackPosition={520}
              itemDistance={240}
              itemScale={0.04}
              itemStackDistance={18}
              baseScale={1}
              blurAmount={2}
              useWindowScroll={true}
            >
              {EXPERIENCES_DATA.map((exp, idx) => {
                const floatClass = `float-milestone-${idx % 5}`;
                return (
                  <ScrollStackItem key={exp.id}>
                    <div className={`w-full h-full transform-gpu ${floatClass}`}>
                      <MilestoneCard
                        exp={exp}
                        isHovered={hoveredExpIndex === idx}
                        onHoverStart={() => setHoveredExpIndex(idx)}
                        onHoverEnd={() => setHoveredExpIndex(null)}
                      />
                    </div>
                  </ScrollStackItem>
                );
              })}
            </ScrollStack>
          </div>
        </motion.section>

        {/* Mobile View (View HP): Clean Fade-In List (No Stacking / Pinning) */}
        <section
          id="experience-milestones-section-mobile"
          className="block md:hidden relative flex flex-col justify-center py-8"
        >
          <div className="space-y-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-3 text-left py-2 max-w-full"
            >
              <h2 className="text-3xl font-mono font-black text-neutral-900 dark:text-white tracking-tight">
                Career Timeline & Milestones
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-sans max-w-2xl">
                A chronological track record of engineering leadership, AI development, and research.
              </p>
            </motion.div>

            <div className="flex flex-col gap-6 w-full">
              {EXPERIENCES_DATA.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full"
                >
                  <MilestoneCard
                    exp={exp}
                    isHovered={hoveredExpIndex === idx}
                    onHoverStart={() => setHoveredExpIndex(idx)}
                    onHoverEnd={() => setHoveredExpIndex(null)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          variants={KINETIC_ITEM_VARIANTS}
          id="certifications-section"
          className="min-h-[85vh] sm:min-h-screen flex flex-col justify-center py-16 sm:py-24 scroll-mt-20"
        >
          <div className="w-full my-auto will-change-transform transform-gpu">
            <CertificationsSlider />
          </div>
        </motion.section>

        <motion.div variants={KINETIC_ITEM_VARIANTS}>
          <ToolsFrameworksGrid />
        </motion.div>
      </div>
    </div>
  );
}

export default ExperienceShowcase;
