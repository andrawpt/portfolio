import { motion } from "motion/react";
import { useTheme } from "@/hooks/use-theme";
import { TECH_SKILL_ICONS } from "../data";

export function ToolsFrameworksGrid() {
  const { isDark } = useTheme();

  return (
    <section className="min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-center py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8 sm:space-y-10 w-full my-auto"
      >
        <div className="space-y-3 text-center sm:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 35, filter: "blur(12px)", scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 20,
              mass: 0.8,
            }}
            className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 dark:text-white tracking-tight"
          >
            Tools & Frameworks
          </motion.h2>
          <p className="text-xs sm:text-sm font-sans text-neutral-600 dark:text-neutral-400">
            Core technologies, libraries, and runtime ecosystems utilized across production systems.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {TECH_SKILL_ICONS.map((tech, idx) => {
            const IconComp = tech.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.86, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.15 }}
                whileHover={{
                  y: -10,
                  scale: 1.08,
                  transition: {
                    type: "spring",
                    stiffness: 380,
                    damping: 14,
                    mass: 0.7,
                  },
                }}
                whileTap={{
                  scale: 0.94,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: (idx % 6) * 0.04 + Math.floor(idx / 6) * 0.06,
                }}
                className="group relative flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-900/15 dark:border-white/15 shadow-sm hover:border-neutral-900/40 dark:hover:border-white/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:bg-white/90 dark:hover:bg-neutral-900/90 transition-[background-color,border-color,box-shadow] duration-200 cursor-pointer overflow-hidden transform-gpu will-change-transform select-none"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br from-neutral-900/5 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                <div className="shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-8 ease-out">
                  <IconComp
                    className="w-6 h-6"
                    style={{ color: isDark ? "#FFFFFF" : tech.color }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-mono font-bold text-neutral-900 dark:text-white truncate relative z-10 group-hover:tracking-wide transition-all duration-200">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
