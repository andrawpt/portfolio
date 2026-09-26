import { useState } from "react";
import { motion } from "motion/react";
import { BENTO_WIDTH_VARIANTS } from "../data";
import { ProjectCard } from "./ProjectCard";
import type { ProjectItem } from "../types";

interface SingleRowBentoMarqueeTrackProps {
  projectsOrder: ProjectItem[];
}

export function SingleRowBentoMarqueeTrack({
  projectsOrder,
}: SingleRowBentoMarqueeTrackProps) {
  const [userHoveredIdx, setUserHoveredIdx] = useState<number | null>(null);

  const marqueeItems = [...projectsOrder, ...projectsOrder];

  return (
    <div
      onMouseLeave={() => setUserHoveredIdx(null)}
      className="relative w-full overflow-hidden pt-4 pb-12 sm:pt-6 sm:pb-16 select-none [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
    >
      <motion.div
        className="flex gap-6 items-stretch w-max px-3 pt-4 pb-10 sm:pt-6 sm:pb-14"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        }}
      >
        {marqueeItems.map((proj, idx) => {
          const originalIdx = idx % projectsOrder.length;
          const colSpan = BENTO_WIDTH_VARIANTS[originalIdx % BENTO_WIDTH_VARIANTS.length];

          const isActive = userHoveredIdx === originalIdx;
          const isOtherActive = userHoveredIdx !== null && userHoveredIdx !== originalIdx;

          return (
            <ProjectCard
              key={`${proj.id}-single-marquee-${idx}`}
              proj={proj}
              idx={originalIdx}
              colSpan={colSpan}
              isActive={isActive}
              isOtherActive={isOtherActive}
              onMouseEnter={() => setUserHoveredIdx(originalIdx)}
              onMouseLeave={() => setUserHoveredIdx(null)}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

