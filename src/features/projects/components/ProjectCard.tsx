import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BENTO_FLOAT_VARIANTS } from "../data";
import type { ProjectItem } from "../types";

interface ProjectCardProps {
  proj: ProjectItem;
  idx: number;
  colSpan: string;
  isActive: boolean;
  isOtherActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ProjectCard({
  proj,
  idx,
  colSpan,
  isActive,
  isOtherActive,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) {
  const floatConfig = BENTO_FLOAT_VARIANTS[idx % BENTO_FLOAT_VARIANTS.length];

  return (
    <motion.div
      key={`${proj.id}-${idx}`}
      className={cn(colSpan, "relative flex flex-col justify-stretch z-10")}
    >
      <motion.div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        animate={
          isActive
            ? {
                scale: 1.04,
                y: -14,
                rotate: 0,
                opacity: 1,
                zIndex: 50,
              }
            : isOtherActive
            ? {
                scale: 0.96,
                y: 0,
                rotate: 0,
                opacity: 0.55,
                zIndex: 1,
              }
            : {
                scale: 1,
                y: floatConfig.y,
                rotate: floatConfig.rotate,
                opacity: 1,
                zIndex: 1,
              }
        }
        transition={
          isActive || isOtherActive
            ? {
                type: "spring",
                stiffness: 380,
                damping: 14,
                mass: 0.7,
              }
            : {
                y: {
                  duration: floatConfig.duration,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
                rotate: {
                  duration: floatConfig.duration * 1.1,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
                scale: {
                  type: "spring",
                  stiffness: 380,
                  damping: 14,
                },
              }
        }
        className={cn(
          "group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl backdrop-blur-2xl transition-[border-color,background-color,box-shadow] duration-200 cursor-default overflow-hidden border text-left touch-none select-none h-full w-full",
          isActive
            ? "bg-white/95 dark:bg-neutral-900/95 border-neutral-900/40 dark:border-white/40 shadow-[0_28px_56px_rgba(0,0,0,0.18)] dark:shadow-[0_28px_56px_rgba(0,0,0,0.7)]"
            : "bg-white/40 dark:bg-neutral-900/40 border-white/40 dark:border-white/15 shadow-xl hover:border-neutral-900/30 dark:hover:border-white/30"
        )}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0 bg-gradient-to-br from-neutral-900/10 via-neutral-900/5 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent"
        />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-start">
            <div className="inline-flex items-center px-3 py-1 rounded-xl backdrop-blur-md bg-neutral-900/5 dark:bg-white/10 border border-neutral-900/10 dark:border-white/15 text-[11px] font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
              <span>{proj.status}</span>
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <span className="text-[11px] font-mono font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
              {proj.tag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 dark:text-white tracking-tight">
              {proj.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-neutral-600 dark:text-neutral-400 font-medium">
              {proj.subtitle}
            </p>
          </div>

          <p className="text-sm font-sans text-neutral-700 dark:text-neutral-300 leading-relaxed text-left line-clamp-3">
            {proj.description}
          </p>
        </div>

        <div className="relative z-10 space-y-4 pt-5">
          <div className="flex flex-wrap gap-2">
            {proj.badges.map((badge, bIdx) => (
              <span
                key={bIdx}
                className="px-3 py-1 rounded-xl text-xs font-mono font-semibold backdrop-blur-md bg-white/60 dark:bg-white/5 border border-white/50 dark:border-white/10 text-neutral-800 dark:text-neutral-200"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
