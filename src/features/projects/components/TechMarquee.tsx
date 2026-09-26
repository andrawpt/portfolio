import { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { SINGLE_ROW_LOGOS } from "../data";
import type { TechLogoItem } from "../types";

interface MarqueeLogoItemProps {
  item: TechLogoItem;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
  isDark: boolean;
}

function MarqueeLogoItem({
  item,
  index,
  hoveredIndex,
  setHoveredIndex,
  isDark,
}: MarqueeLogoItemProps) {
  const Icon = item.icon;
  const isHovered = hoveredIndex === index;

  let shiftX = 0;
  if (hoveredIndex !== null && hoveredIndex !== index) {
    const diff = index - hoveredIndex;
    const absDiff = Math.abs(diff);
    const pushDir = diff > 0 ? 1 : -1;
    const pushAmount = Math.max(3, 20 - (absDiff - 1) * 2.5);
    shiftX = pushDir * pushAmount;
  }

  const hoveredShadow = isDark
    ? "0 18px 36px rgba(255, 255, 255, 0.4), inset 0 1.5px 2px rgba(255, 255, 255, 0.5)"
    : `0 18px 36px ${item.color}66, inset 0 1.5px 2px rgba(255, 255, 255, 0.9)`;

  return (
    <motion.div
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onTouchStart={() => setHoveredIndex(index)}
      onTouchEnd={() => setHoveredIndex(null)}
      animate={
        isHovered
          ? {
              scale: 1.25,
              y: -10,
              x: 0,
              zIndex: 50,
              boxShadow: hoveredShadow,
            }
          : {
              scale: 1,
              y: 0,
              x: shiftX,
              zIndex: 10,
              boxShadow: isDark
                ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                : "0 4px 12px rgba(0, 0, 0, 0.05)",
            }
      }
      transition={
        isHovered
          ? {
              type: "spring",
              stiffness: 450,
              damping: 20,
              mass: 0.5,
            }
          : {
              type: "spring",
              stiffness: 360,
              damping: 24,
            }
      }
      title={item.name}
      style={{
        backdropFilter: isHovered ? "blur(24px) saturate(180%)" : "blur(16px)",
        WebkitBackdropFilter: isHovered ? "blur(24px) saturate(180%)" : "blur(16px)",
      }}
      className={cn(
        "relative p-4 sm:p-4.5 rounded-full transition-colors duration-300 cursor-pointer group flex items-center justify-center border shrink-0",
        isHovered
          ? "bg-white/80 dark:bg-white/20 border-white/80 dark:border-white/50"
          : "bg-white/30 dark:bg-white/10 border-white/40 dark:border-white/20"
      )}
    >
      <Icon
        className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ color: isDark ? "#FFFFFF" : item.color }}
      />
    </motion.div>
  );
}

export function TechMarquee() {
  const { isDark } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-5xl py-0 my-0 pointer-events-auto overflow-visible">
      <div className="flex overflow-hidden pt-3 pb-9 sm:pt-4 sm:pb-12 [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-3 sm:gap-3.5 shrink-0 px-2 pt-2 pb-6 sm:pt-3 sm:pb-8"
        >
          {SINGLE_ROW_LOGOS.map((item, idx) => (
            <MarqueeLogoItem
              key={`single-row-${idx}`}
              item={item}
              index={idx}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              isDark={isDark}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
