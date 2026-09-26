import { motion, AnimatePresence } from "motion/react";
import { IconCheck, IconArrowRight } from "@tabler/icons-react";
import type { SkillCategoryItem } from "../types";

interface SkillCardProps {
  hardCat: SkillCategoryItem;
  softCat: SkillCategoryItem;
  activeSkillTab: "hard" | "soft";
  isHovered: boolean;
  index: number;
}

export function SkillCard({
  hardCat,
  softCat,
  activeSkillTab,
  isHovered,
  index,
}: SkillCardProps) {
  const HardIcon = hardCat.icon;
  const SoftIcon = softCat.icon;
  const flipDelay = activeSkillTab === "soft" ? index * 0.14 : (2 - index) * 0.14;

  return (
    <div
      style={{
        perspective: 1200,
      }}
      className="relative w-full h-[460px] sm:h-[490px] md:h-[510px] cursor-pointer"
    >
      <motion.div
        animate={{
          rotateY: activeSkillTab === "soft" ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: flipDelay,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            backdropFilter: "blur(12px) saturate(160%)",
            WebkitBackdropFilter: "blur(12px) saturate(160%)",
          }}
          className={`absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-9 w-full h-full rounded-3xl backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-200 cursor-pointer overflow-hidden ${
            isHovered
              ? "bg-white/80 dark:bg-neutral-900/80 border border-white/60 dark:border-white/30 shadow-[0_28px_56px_rgba(0,0,0,0.15)] dark:shadow-[0_28px_56px_rgba(0,0,0,0.7)]"
              : "bg-white/70 dark:bg-neutral-900/70 border border-white/40 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/60 dark:hover:border-white/30"
          }`}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl overflow-visible z-30"
              >
                <motion.rect
                  x="1.5"
                  y="1.5"
                  style={{
                    width: "calc(100% - 3px)",
                    height: "calc(100% - 3px)",
                  }}
                  rx="24"
                  fill="none"
                  className="stroke-neutral-900 dark:stroke-white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </motion.svg>
            )}
          </AnimatePresence>

          <div className="flex flex-col justify-between h-full w-full space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between">
              <motion.div
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  rotate: isHovered ? 6 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 12,
                }}
                className="p-2.5 sm:p-3 rounded-full bg-neutral-900/5 dark:bg-white/10 border border-neutral-900/10 dark:border-white/15 text-neutral-800 dark:text-white"
              >
                <HardIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.9]" />
              </motion.div>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                {hardCat.tag}
              </span>
            </div>

            <div className="flex flex-col space-y-1 sm:space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {hardCat.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans font-medium text-neutral-500 dark:text-neutral-400">
                {hardCat.subtitle}
              </p>
            </div>

            <div className="space-y-2 pt-1 flex-1">
              {hardCat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-neutral-900/5 dark:bg-white/10 border border-neutral-900/10 dark:border-white/15 text-xs font-sans font-medium text-neutral-800 dark:text-neutral-200 shadow-xs"
                >
                  <IconCheck className="w-3.5 h-3.5 text-neutral-900 dark:text-white shrink-0 stroke-[2.2]" />
                  <span className="truncate">{skill}</span>
                </div>
              ))}
            </div>

            <motion.div
              animate={{
                x: isHovered ? 4 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 12,
              }}
              className="pt-3 flex items-center gap-2 text-neutral-900 dark:text-white font-sans font-semibold text-xs sm:text-sm border-t border-neutral-900/10 dark:border-white/10"
            >
              <span>Technical Focus</span>
              <IconArrowRight className="w-4 h-4 stroke-[2.4]" />
            </motion.div>
          </div>
        </div>

        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
            backdropFilter: "blur(12px) saturate(160%)",
            WebkitBackdropFilter: "blur(12px) saturate(160%)",
          }}
          className={`absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-9 w-full h-full rounded-3xl backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-200 cursor-pointer overflow-hidden ${
            isHovered
              ? "bg-white/80 dark:bg-neutral-900/80 border border-white/60 dark:border-white/30 shadow-[0_28px_56px_rgba(0,0,0,0.15)] dark:shadow-[0_28px_56px_rgba(0,0,0,0.7)]"
              : "bg-white/70 dark:bg-neutral-900/70 border border-white/40 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/60 dark:hover:border-white/30"
          }`}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl overflow-visible z-30"
              >
                <motion.rect
                  x="1.5"
                  y="1.5"
                  style={{
                    width: "calc(100% - 3px)",
                    height: "calc(100% - 3px)",
                  }}
                  rx="24"
                  fill="none"
                  className="stroke-neutral-900 dark:stroke-white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </motion.svg>
            )}
          </AnimatePresence>

          <div className="flex flex-col justify-between h-full w-full space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between">
              <motion.div
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  rotate: isHovered ? 6 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 12,
                }}
                className="p-2.5 sm:p-3 rounded-full bg-neutral-900/5 dark:bg-white/10 border border-neutral-900/10 dark:border-white/15 text-neutral-800 dark:text-white"
              >
                <SoftIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.9]" />
              </motion.div>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                {softCat.tag}
              </span>
            </div>

            <div className="flex flex-col space-y-1 sm:space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {softCat.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans font-medium text-neutral-500 dark:text-neutral-400">
                {softCat.subtitle}
              </p>
            </div>

            <div className="space-y-2 pt-1 flex-1">
              {softCat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-neutral-900/5 dark:bg-white/10 border border-neutral-900/10 dark:border-white/15 text-xs font-sans font-medium text-neutral-800 dark:text-neutral-200 shadow-xs"
                >
                  <IconCheck className="w-3.5 h-3.5 text-neutral-900 dark:text-white shrink-0 stroke-[2.2]" />
                  <span className="truncate">{skill}</span>
                </div>
              ))}
            </div>

            <motion.div
              animate={{
                x: isHovered ? 4 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 12,
              }}
              className="pt-3 flex items-center gap-2 text-neutral-900 dark:text-white font-sans font-semibold text-xs sm:text-sm border-t border-neutral-900/10 dark:border-white/10"
            >
              <span>Leadership & Operations</span>
              <IconArrowRight className="w-4 h-4 stroke-[2.4]" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
