import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IconCode, IconUsers } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { SkillCard } from "./SkillCard";
import {
  HARD_SKILL_CATEGORIES,
  SOFT_SKILL_CATEGORIES,
  FLOAT_CONFIGS,
  BASE_STACK,
  KINETIC_ITEM_VARIANTS,
} from "../data";

export function SkillsSection() {
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState<number | null>(null);
  const skillsSectionRef = useRef<HTMLElement>(null);
  const [activeSkillTab, setActiveSkillTab] = useState<"hard" | "soft">("hard");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress: skillsScrollProgress } = useScroll({
    target: skillsSectionRef,
    offset: ["start 90%", "center center"],
  });

  const leftXSpread = useTransform(skillsScrollProgress, [0, 0.7, 1], [-175, -50, 28]);
  const leftRotate = useTransform(skillsScrollProgress, [0, 0.7, 1], [0, -4, -10]);
  const leftY = useTransform(skillsScrollProgress, [0, 0.7, 1], [0, 10, 22]);

  const centerY = useTransform(skillsScrollProgress, [0, 0.7, 1], [0, -5, -10]);

  const rightXSpread = useTransform(skillsScrollProgress, [0, 0.7, 1], [175, 50, -28]);
  const rightRotate = useTransform(skillsScrollProgress, [0, 0.7, 1], [0, 4, 10]);
  const rightY = useTransform(skillsScrollProgress, [0, 0.7, 1], [0, 10, 22]);

  const getCardAnimate = (index: number) => {
    if (isMobile) {
      return {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        zIndex: 1,
        opacity: 1,
        filter: "none",
      };
    }

    const isHovered = hoveredSkillIndex === index;
    const isAnyHovered = hoveredSkillIndex !== null;

    if (isHovered) {
      return {
        x: 0,
        y: -52,
        rotate: 0,
        scale: 1.08,
        zIndex: 50,
        opacity: 1,
        filter: "blur(0px)",
      };
    }

    if (isAnyHovered) {
      let shiftX = 0;
      if (hoveredSkillIndex !== null && index < hoveredSkillIndex) shiftX = -38;
      if (hoveredSkillIndex !== null && index > hoveredSkillIndex) shiftX = 38;

      return {
        rotate: 0,
        y: 14,
        x: shiftX,
        scale: 0.95,
        zIndex: BASE_STACK[index].zIndex,
        opacity: 0.45,
        filter: "blur(6px)",
      };
    }

    return {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      zIndex: BASE_STACK[index].zIndex,
      opacity: 1,
      filter: "blur(0px)",
    };
  };

  return (
    <motion.section
      variants={KINETIC_ITEM_VARIANTS}
      ref={skillsSectionRef}
      className="min-h-[88vh] sm:min-h-[92vh] flex flex-col justify-center py-8 sm:py-12"
    >
      <div className="flex flex-col justify-between space-y-6 sm:space-y-12">
        {/* Title & Subtitle (order-1 on all views) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 space-y-2 text-center sm:text-left"
        >
          <div className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            Technical & Interpersonal Mastery
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-black text-neutral-900 dark:text-white tracking-tight">
            Skills & Expertise
          </h2>
        </motion.div>

        {/* Button Toggle: order-2 on mobile (above cards), order-3 on desktop (below cards) */}
        <div className="order-2 sm:order-3 flex items-center justify-center pt-1 sm:pt-8 pb-1 sm:pb-4">
          <div className="relative flex items-center p-1.5 rounded-2xl sm:rounded-3xl bg-neutral-900/5 dark:bg-white/10 border border-neutral-900/10 dark:border-white/15 shadow-xl">
            <button
              onClick={() => setActiveSkillTab("hard")}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2.5 w-[145px] sm:w-[165px] py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-mono font-bold transition-colors duration-300 cursor-pointer",
                activeSkillTab === "hard"
                  ? "text-white dark:text-neutral-950"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
              )}
            >
              {activeSkillTab === "hard" && (
                <motion.div
                  layoutId="activeSkillPill"
                  transition={{ type: "spring", stiffness: 480, damping: 32 }}
                  className="absolute inset-0 rounded-xl sm:rounded-2xl bg-neutral-950 dark:bg-white shadow-md -z-10"
                />
              )}
              <IconCode className="w-5 h-5 stroke-[2]" />
              <span>Hard Skills</span>
            </button>

            <button
              onClick={() => setActiveSkillTab("soft")}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2.5 w-[145px] sm:w-[165px] py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-mono font-bold transition-colors duration-300 cursor-pointer",
                activeSkillTab === "soft"
                  ? "text-white dark:text-neutral-950"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
              )}
            >
              {activeSkillTab === "soft" && (
                <motion.div
                  layoutId="activeSkillPill"
                  transition={{ type: "spring", stiffness: 480, damping: 32 }}
                  className="absolute inset-0 rounded-xl sm:rounded-2xl bg-neutral-950 dark:bg-white shadow-md -z-10"
                />
              )}
              <IconUsers className="w-5 h-5 stroke-[2]" />
              <span>Soft Skills</span>
            </button>
          </div>
        </div>

        {/* Cards Container: order-3 on mobile (below buttons), order-2 on desktop (above buttons) */}
        <div className="order-3 sm:order-2 relative flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:-space-x-12 md:-space-x-16 lg:-space-x-20 xl:-space-x-24 w-full pt-2 sm:pt-6 pb-4 sm:pb-10">
          {HARD_SKILL_CATEGORIES.map((hardCat, index) => {
            const softCat = SOFT_SKILL_CATEGORIES[index];
            const isHovered = hoveredSkillIndex === index;
            const scrollX = isMobile ? 0 : index === 0 ? leftXSpread : index === 2 ? rightXSpread : 0;
            const scrollY = isMobile ? 0 : index === 0 ? leftY : index === 2 ? rightY : centerY;
            const scrollRotate = isMobile ? 0 : index === 0 ? leftRotate : index === 2 ? rightRotate : 0;
            const baseZ = BASE_STACK[index].zIndex;
            const floatConfig = FLOAT_CONFIGS[index];

            return (
              <motion.div
                key={index}
                style={{ x: scrollX, y: scrollY, rotate: scrollRotate, zIndex: isHovered ? 50 : baseZ }}
                className="relative w-full max-w-[360px] sm:max-w-none sm:w-[320px] md:w-[350px] lg:w-[360px] xl:w-[390px] shrink-0"
              >
                <motion.div
                  animate={
                    isHovered || isMobile
                      ? { y: 0, rotate: 0 }
                      : {
                          y: floatConfig.y,
                          rotate: floatConfig.rotate,
                        }
                  }
                  transition={
                    isHovered || isMobile
                      ? { duration: 0.12, ease: "easeOut" }
                      : {
                          duration: floatConfig.duration,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  className="w-full h-full"
                >
                  <div
                    className="relative w-full h-full"
                    onMouseEnter={() => !isMobile && setHoveredSkillIndex(index)}
                    onMouseLeave={() => !isMobile && setHoveredSkillIndex(null)}
                  >
                    <motion.div
                      animate={getCardAnimate(index)}
                      whileTap={isMobile ? { scale: 0.98 } : undefined}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 14,
                        mass: 0.7,
                      }}
                      onClick={() => setActiveSkillTab((prev) => (prev === "hard" ? "soft" : "hard"))}
                      className="w-full h-full cursor-pointer"
                    >
                      <SkillCard
                        hardCat={hardCat}
                        softCat={softCat}
                        activeSkillTab={activeSkillTab}
                        isHovered={isHovered}
                        index={index}
                        isMobile={isMobile}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
