import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";

interface GetStartedButtonProps {
  onClick: () => void;
}

export function GetStartedButton({ onClick }: GetStartedButtonProps) {
  return (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="group relative pointer-events-auto inline-flex items-center gap-3 sm:gap-5 px-6 py-3.5 sm:px-12 sm:py-5.5 rounded-2xl sm:rounded-3xl overflow-hidden font-mono text-base sm:text-xl md:text-2xl font-bold tracking-wide text-neutral-900 dark:text-white backdrop-blur-xl bg-transparent border border-neutral-900/20 dark:border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:border-black dark:hover:border-white"
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
        Get Started
      </span>
      <motion.div
        variants={{
          hover: { rotate: 90 },
        }}
        initial={{ rotate: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-center text-neutral-900 dark:text-white transition-colors duration-400 group-hover:text-white dark:group-hover:text-neutral-950"
      >
        <IconArrowRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
      </motion.div>
    </motion.button>
  );
}
