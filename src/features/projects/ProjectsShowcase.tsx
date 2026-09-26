import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useColorTheme } from "@/contexts/ColorThemeContext";
import { CounterNumber } from "@/components/ui/CounterNumber";
import {
  PROJECTS_DATA,
  PROJECT_STATS,
  STAT_FLOAT_VARIANTS,
  KINETIC_ITEM_VARIANTS,
} from "./data";
import { TechMarquee } from "./components/TechMarquee";
import { SingleRowBentoMarqueeTrack } from "./components/SingleRowBentoMarqueeTrack";
import type { ProjectsShowcaseProps, ProjectItem } from "./types";

export default function ProjectsShowcase({ onBack: _onBack }: ProjectsShowcaseProps) {
  const { theme } = useColorTheme();
  const [projectsOrder] = useState<ProjectItem[]>(PROJECTS_DATA);

  const section1Ref = useRef<HTMLElement>(null);
  const { scrollYProgress: section1Progress } = useScroll({
    target: section1Ref,
    offset: ["start start", "end start"],
  });

  const section1Opacity = useTransform(section1Progress, [0, 0.7, 1], [1, 0.4, 0]);
  const section1Y = useTransform(section1Progress, [0, 1], [0, -25]);

  const section2Ref = useRef<HTMLElement>(null);
  const { scrollYProgress: section2Progress } = useScroll({
    target: section2Ref,
    offset: ["start 90%", "center center"],
  });

  const section2DeckOpacity = useTransform(section2Progress, [0, 0.35], [0, 1]);
  const section2DeckY = useTransform(section2Progress, [0, 0.45], [70, 0]);

  return (
    <div className="relative min-h-screen w-full bg-transparent text-neutral-900 dark:text-white font-sans overflow-x-hidden pt-0 pb-28 px-4 sm:px-10 md:px-16 lg:px-24 xl:px-28 transition-colors duration-500">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] opacity-15 dark:opacity-30 transition-all duration-700"
          style={{ backgroundColor: `${theme.primary}25` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-left space-y-16 sm:space-y-28">
        <section ref={section1Ref} className="min-h-screen flex flex-col justify-center pt-20 sm:pt-24 pb-12 sm:pb-16">
          <motion.div
            style={{
              opacity: section1Opacity,
              y: section1Y,
            }}
            className="my-auto space-y-5 sm:space-y-6 text-center sm:text-left max-w-5xl will-change-transform flex flex-col items-center sm:items-start w-full"
          >
            <div className="space-y-2.5 sm:space-y-3 max-w-4xl text-center sm:text-left">
              <motion.h1
                variants={KINETIC_ITEM_VARIANTS}
                className="text-3xl sm:text-6xl md:text-7xl font-black font-mono tracking-tight text-neutral-900 dark:text-white leading-[1.08] text-center sm:text-left"
              >
                Crafting Intelligent Systems &{" "}
                <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
                  Modern Software
                </span>
              </motion.h1>

              <motion.p
                variants={KINETIC_ITEM_VARIANTS}
                className="text-base sm:text-xl font-normal text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed max-w-3xl text-center sm:text-left"
              >
                A dedicated portfolio of machine learning architectures, generative AI engines, computer vision pipelines, and production web applications built with mathematical rigor.
              </motion.p>
            </div>

            <motion.div variants={KINETIC_ITEM_VARIANTS}>
              <TechMarquee />
            </motion.div>

            <motion.div
              variants={KINETIC_ITEM_VARIANTS}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-1 sm:pt-2"
            >
              {PROJECT_STATS.map((stat, idx) => {
                const variant = STAT_FLOAT_VARIANTS[idx % STAT_FLOAT_VARIANTS.length];

                  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

                  return (
                    <motion.div
                      key={idx}
                      animate={
                        isMobile
                          ? { y: 0, rotate: 0 }
                          : {
                              y: variant.animateY,
                              rotate: variant.animateRotate,
                            }
                      }
                      transition={
                        isMobile
                          ? { duration: 0.12 }
                          : {
                              y: {
                                duration: variant.duration,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                                delay: variant.delay,
                              },
                              rotate: {
                                duration: variant.duration * 1.1,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                                delay: variant.delay,
                              },
                            }
                      }
                      className="transform-gpu relative"
                    >
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                        y: -16,
                        rotate: idx % 2 === 0 ? 1.5 : -1.5,
                        zIndex: 30,
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 18,
                        mass: 0.75,
                      }}
                      className="p-6 rounded-3xl backdrop-blur-2xl bg-white/40 dark:bg-neutral-900/40 border border-white/40 dark:border-white/15 shadow-lg hover:shadow-2xl text-left space-y-1.5 transition-colors duration-300 cursor-pointer relative z-10"
                    >
                      <div className="text-3xl sm:text-4xl font-mono font-black text-neutral-900 dark:text-white">
                        <CounterNumber value={stat.value} />
                      </div>
                      <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                        {stat.label}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>

        <section
          ref={section2Ref}
          className="min-h-screen flex flex-col justify-center pt-20 sm:pt-28 pb-16 sm:pb-24 scroll-mt-28"
        >
          <motion.div variants={KINETIC_ITEM_VARIANTS} className="my-auto space-y-6 sm:space-y-8 text-left w-full">
            <div className="space-y-3 text-left">
              <motion.h2
                initial={{ opacity: 0, y: 45, filter: "blur(12px)", scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 20,
                  mass: 0.8,
                  delay: 0.1,
                }}
                className="text-3xl sm:text-4xl md:text-5xl font-mono font-black text-neutral-900 dark:text-white tracking-tight"
              >
                Architectural Grid
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.25,
                }}
                className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans max-w-2xl"
              >
                Explore selected technical architecture implementations, machine learning models, and full-stack systems. Hover to pause and inspect deep technical details.
              </motion.p>
            </div>

            <motion.div
              style={{ opacity: section2DeckOpacity, y: section2DeckY }}
              initial={{ opacity: 0, y: 55, filter: "blur(12px)", scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 20,
                mass: 0.8,
                delay: 0.2,
              }}
              className="w-full"
            >
              <SingleRowBentoMarqueeTrack
                projectsOrder={projectsOrder}
              />
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
