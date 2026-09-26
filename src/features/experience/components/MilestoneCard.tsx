import { motion, AnimatePresence } from "motion/react";
import type { ExperienceItem } from "../types";

interface MilestoneCardProps {
  exp: ExperienceItem;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export function MilestoneCard({
  exp,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: MilestoneCardProps) {
  return (
    <motion.div
      animate={
        isHovered
          ? {
              y: -14,
              scale: 1.03,
            }
          : {
              y: 0,
              scale: 1,
            }
      }
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 12,
        mass: 0.65,
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`relative w-full h-full min-h-[280px] flex flex-col justify-between rounded-3xl backdrop-blur-md bg-white/95 dark:bg-neutral-900/95 p-7 sm:p-9 md:p-10 transition-[border-color,box-shadow,background-color] duration-200 overflow-hidden group cursor-default transform-gpu will-change-transform ${
        isHovered
          ? "border border-neutral-900/40 dark:border-white/40 shadow-[0_28px_56px_rgba(0,0,0,0.18)] dark:shadow-[0_28px_56px_rgba(0,0,0,0.7)]"
          : "border border-neutral-900/15 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-neutral-900/30 dark:hover:border-white/30"
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

      <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-gradient-to-br from-neutral-900/5 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none group-hover:scale-125 transition-transform duration-500" />

      <div className="relative z-10 flex flex-col justify-between gap-5 sm:gap-6 h-full w-full">
        <div className="space-y-4 w-full">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1 rounded-xl text-xs font-mono font-bold bg-neutral-900/5 dark:bg-white/10 text-neutral-900 dark:text-white border border-neutral-900/15 dark:border-white/20">
              {exp.period}
            </span>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-medium">
              {exp.location}
            </span>
          </div>

          <div className="space-y-0.5">
            <h3 className="text-2xl sm:text-3xl font-mono font-black text-neutral-900 dark:text-white tracking-tight">
              {exp.role}
            </h3>
            <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400 font-semibold pt-0.5">
              {exp.company}
            </p>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {exp.badges.map((badge, bIdx) => (
              <span
                key={bIdx}
                className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-black/[0.04] dark:bg-white/[0.06] border border-neutral-900/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:scale-105 hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-all duration-200 cursor-default"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
