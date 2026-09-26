import { motion } from "motion/react";
import {
  IconUser,
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconArrowRight,
} from "@tabler/icons-react";
import { CounterNumber } from "@/components/ui/CounterNumber";
import { ABOUT_STATS, KINETIC_ITEM_VARIANTS } from "../data";

interface ProfileHeroProps {
  onOpenContact: () => void;
}

export function ProfileHero({ onOpenContact }: ProfileHeroProps) {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center py-10 sm:py-16">
      <div className="space-y-12 sm:space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-8 space-y-5 sm:space-y-6 text-center sm:text-left flex flex-col items-center sm:items-start">
            <motion.h1
              variants={KINETIC_ITEM_VARIANTS}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-mono tracking-tight text-neutral-900 dark:text-white leading-[1.1] text-center sm:text-left"
            >
              Architecting <br />
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
                Intelligent AI
              </span>
            </motion.h1>

            <motion.p
              variants={KINETIC_ITEM_VARIANTS}
              className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl text-center sm:text-left"
            >
              Step inside to get to know me beyond the code — dive into my journey, mindset, and engineering philosophies. <strong className="text-neutral-900 dark:text-white font-semibold">Enjoy exploring!</strong>
            </motion.p>

            <motion.div
              variants={KINETIC_ITEM_VARIANTS}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-5 pt-3 sm:pt-4"
            >
              <motion.button
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                onClick={onOpenContact}
                className="group relative pointer-events-auto inline-flex items-center gap-3 sm:gap-4 px-6 py-3.5 sm:px-10 sm:py-5 rounded-2xl sm:rounded-3xl overflow-hidden font-mono text-base sm:text-xl font-bold tracking-wide text-neutral-900 dark:text-white backdrop-blur-xl bg-transparent border border-neutral-900/20 dark:border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:border-black dark:hover:border-white"
              >
                <motion.div
                  variants={{
                    hover: { x: "0%" },
                  }}
                  initial={{ x: "-100%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-neutral-950 dark:bg-white z-0 pointer-events-none rounded-2xl sm:rounded-3xl"
                />
                <span className="relative z-10 font-bold transition-colors duration-400 group-hover:text-white dark:group-hover:text-neutral-950">
                  Get In Touch
                </span>
                <motion.div
                  variants={{
                    hover: { scale: 1.15 },
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 flex items-center justify-center text-neutral-900 dark:text-white transition-colors duration-400 group-hover:text-white dark:group-hover:text-neutral-950"
                >
                  <IconMail className="w-6 h-6 stroke-[2.5]" />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                onClick={() => window.open("/cv.pdf", "_blank")}
                className="group relative pointer-events-auto inline-flex items-center gap-3 sm:gap-4 px-6 py-3.5 sm:px-10 sm:py-5 rounded-2xl sm:rounded-3xl overflow-hidden font-mono text-base sm:text-xl font-bold tracking-wide text-neutral-900 dark:text-white backdrop-blur-xl bg-transparent border border-neutral-900/20 dark:border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:border-black dark:hover:border-white"
              >
                <motion.div
                  variants={{
                    hover: { x: "0%" },
                  }}
                  initial={{ x: "-100%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-neutral-950 dark:bg-white z-0 pointer-events-none rounded-2xl sm:rounded-3xl"
                />
                <span className="relative z-10 font-bold transition-colors duration-400 group-hover:text-white dark:group-hover:text-neutral-950">
                  Resume / CV
                </span>
                <motion.div
                  variants={{
                    hover: { rotate: -45, scale: 1.15 },
                  }}
                  initial={{ rotate: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 flex items-center justify-center text-neutral-900 dark:text-white transition-colors duration-400 group-hover:text-white dark:group-hover:text-neutral-950"
                >
                  <IconArrowRight className="w-6 h-6 stroke-[2.5]" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <motion.div
              variants={KINETIC_ITEM_VARIANTS}
              whileHover={{ y: -14, scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 280, damping: 18, mass: 0.75 }}
              className="relative p-6 sm:p-8 rounded-3xl backdrop-blur-2xl bg-white/40 dark:bg-neutral-900/40 border border-white/40 dark:border-white/15 shadow-xl hover:shadow-2xl w-full max-w-[320px] text-center space-y-4 hover:border-black dark:hover:border-white transition-colors duration-300 cursor-pointer"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full p-1 border border-neutral-900/15 dark:border-white/20 bg-neutral-900/5 dark:bg-white/10 shadow-lg">
                <div className="w-full h-full rounded-full backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 flex items-center justify-center text-neutral-900 dark:text-white">
                  <IconUser className="w-12 h-12 sm:w-14 sm:h-14" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-mono font-bold text-neutral-900 dark:text-white">Kadek Andra W. P.</h3>
                <p className="text-sm font-mono pt-1 text-neutral-600 dark:text-neutral-400">
                  AI Engineer • Informatics ITS
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-2">
                <a
                  href="https://github.com/andra-wp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl backdrop-blur-md bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 border border-white/40 dark:border-white/10 text-neutral-800 dark:text-white transition-colors"
                >
                  <IconBrandGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/andrapwpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl backdrop-blur-md bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 border border-white/40 dark:border-white/10 text-neutral-800 dark:text-white transition-colors"
                >
                  <IconBrandLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/andrawpz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl backdrop-blur-md bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 border border-white/40 dark:border-white/10 text-neutral-800 dark:text-white transition-colors"
                >
                  <IconBrandInstagram className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div variants={KINETIC_ITEM_VARIANTS} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {ABOUT_STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.08,
                y: -14,
                rotate: idx % 2 === 0 ? 1.5 : -1.5,
              }}
              whileTap={{ scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 18,
                mass: 0.75,
              }}
              className="p-6 rounded-3xl backdrop-blur-2xl bg-white/40 dark:bg-neutral-900/40 border border-white/40 dark:border-white/15 shadow-lg hover:shadow-2xl text-center space-y-2 hover:border-black dark:hover:border-white transition-colors duration-300 cursor-pointer"
            >
              <div className="text-4xl sm:text-5xl font-mono font-black text-neutral-900 dark:text-white drop-shadow-sm">
                <CounterNumber value={stat.value} />
              </div>
              <div className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
