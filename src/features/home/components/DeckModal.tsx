import { motion, AnimatePresence } from "motion/react";
import { IconX, IconCheck } from "@tabler/icons-react";
import type { HomeCardItem } from "../types";

interface DeckModalProps {
  card: HomeCardItem | null;
  onClose: () => void;
}

export function DeckModal({ card, onClose }: DeckModalProps) {
  return (
    <AnimatePresence>
      {card && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, y: 25, filter: "blur(12px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-900/15 dark:border-white/20 p-6 sm:p-10 shadow-2xl z-10 font-sans"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900/5 dark:bg-white/10 hover:bg-neutral-900/10 dark:hover:bg-white/20 text-neutral-900 dark:text-white transition-colors cursor-pointer"
            >
              <IconX className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold border ${card.badgeBg}`}>
                {card.tag}
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-mono font-black text-neutral-900 dark:text-neutral-100 mb-2">
              {card.modalContent.heading}
            </h3>

            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              {card.modalContent.details}
            </p>

            <div className="space-y-3 mb-8">
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Key Highlights
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {card.modalContent.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-900/5 dark:bg-white/5 border border-neutral-900/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-sm font-medium"
                  >
                    <IconCheck className="w-5 h-5 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-mono font-bold text-sm shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Close Detail
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
