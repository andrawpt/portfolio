import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  IconCertificate,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { CERTIFICATIONS_DATA } from "../data";
import type { CertificationItem } from "../types";

const ITEMS_PER_PAGE = 4;

const containerVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
    scale: 0.96,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
      type: "spring",
      stiffness: 300,
      damping: 22,
      mass: 0.8,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    scale: 0.96,
    transition: {
      duration: 0.2,
      ease: [0.32, 0, 0.67, 0] as const,
    },
  }),
};

const cardVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 30 : -30,
    y: 15,
    scale: 0.94,
  }),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 16,
      mass: 0.65,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.18,
      ease: [0.32, 0, 0.67, 0] as const,
    },
  }),
};

interface CertificationsSliderProps {
  data?: CertificationItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function CertificationsSlider({
  data = CERTIFICATIONS_DATA,
  title = "Certifications & Honors",
  subtitle = "Professional specializations, verified credentials, and technical awards.",
  className = "",
}: CertificationsSliderProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<number>(0);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginate = (newDirection: number) => {
    const nextPage = page + newDirection;
    if (nextPage >= 0 && nextPage < totalPages) {
      setDirection(newDirection);
      setPage(nextPage);
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex === page) return;
    setDirection(pageIndex > page ? 1 : -1);
    setPage(pageIndex);
  };

  const startIndex = page * ITEMS_PER_PAGE;
  const currentCards = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className={`w-full space-y-6 sm:space-y-8 ${className}`.trim()}>
      <motion.div
        initial={{ opacity: 0, y: 35, filter: "blur(10px)", scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 20,
          mass: 0.8,
          delay: 0.05,
        }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div className="space-y-1.5 text-left">
          <motion.h2
            initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 20,
              mass: 0.8,
              delay: 0.1,
            }}
            className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-neutral-900 dark:text-white tracking-tight"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.18,
              }}
              className="text-xs sm:text-sm font-sans text-neutral-600 dark:text-neutral-400"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 20,
            delay: 0.2,
          }}
          className="flex items-center gap-3 self-end sm:self-auto"
        >
          <div className="hidden sm:flex items-center px-3 py-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-400">
            <span>
              {page + 1} / {totalPages}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <motion.button
              whileHover={{ scale: 1.12, y: -1 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={() => paginate(-1)}
              disabled={page === 0}
              aria-label="Previous page"
              className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-35 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm cursor-pointer"
            >
              <IconChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.12, y: -1 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={() => paginate(1)}
              disabled={page === totalPages - 1}
              aria-label="Next page"
              className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-35 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm cursor-pointer"
            >
              <IconChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 22,
          mass: 0.85,
          delay: 0.15,
        }}
        className="relative min-h-[380px] sm:min-h-[400px] pt-4 pb-6 px-1 overflow-visible"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={containerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full"
          >
            {currentCards.map((cert, cardIdx) => (
              <motion.div
                key={cert.id}
                custom={direction}
                variants={cardVariants}
                whileHover={{
                  scale: 1.04,
                  y: -10,
                  rotate: cardIdx % 2 === 0 ? 1 : -1,
                  zIndex: 20,
                }}
                whileTap={{ scale: 0.96 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 12,
                  mass: 0.6,
                }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-md hover:shadow-2xl hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors duration-300 text-left cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
                      <IconCertificate className="w-5 h-5" />
                    </div>

                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 group-hover:border-neutral-400 dark:group-hover:border-neutral-500 transition-colors">
                      <span>{cert.categoryBadge}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white font-sans tracking-tight leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 font-sans">
                      {cert.issuer} • {cert.year}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-4 sm:pt-5 border-t border-neutral-100 dark:border-neutral-800/80 mt-4">
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="rounded-full px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors group-hover:bg-neutral-200/80 dark:group-hover:bg-neutral-700/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex items-center justify-center gap-2 pt-2"
      >
        {Array.from({ length: totalPages }).map((_, idx) => {
          const isActive = idx === page;
          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => goToPage(idx)}
              aria-label={`Go to page ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? "w-9 bg-neutral-900 dark:bg-white shadow-md"
                  : "w-2.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
              }`}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

export default CertificationsSlider;
