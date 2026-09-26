import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  IconArrowRight,
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import { CARDS_DATA, FLOAT_CONFIGS, BASE_STACK } from "./data";
import type { HomeCardItem, ThreeCardsSectionProps } from "./types";

export function ThreeCardsSection({
  onOpenAboutPage,
  onOpenProjectsPage,
  onOpenExperiencePage,
}: ThreeCardsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<HomeCardItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleHover = (index: number | null) => {
    setHoveredIndex(index);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center center"],
  });

  const deckOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const deckY = useTransform(scrollYProgress, [0, 0.45], [70, 0]);

  const leftXSpread = useTransform(scrollYProgress, [0, 0.7, 1], [-175, -50, 28]);
  const leftRotate = useTransform(scrollYProgress, [0, 0.7, 1], [0, -4, -10]);
  const leftY = useTransform(scrollYProgress, [0, 0.7, 1], [0, 10, 22]);

  const centerY = useTransform(scrollYProgress, [0, 0.7, 1], [0, -5, -10]);

  const rightXSpread = useTransform(scrollYProgress, [0, 0.7, 1], [175, 50, -28]);
  const rightRotate = useTransform(scrollYProgress, [0, 0.7, 1], [0, 4, 10]);
  const rightY = useTransform(scrollYProgress, [0, 0.7, 1], [0, 10, 22]);

  const getCardAnimate = (index: number) => {
    const isHovered = hoveredIndex === index;
    const isAnyHovered = hoveredIndex !== null;

    if (isHovered) {
      return {
        x: 0,
        y: isMobile ? -16 : -52,
        rotate: 0,
        scale: isMobile ? 1.02 : 1.08,
        zIndex: 50,
        opacity: 1,
        filter: isMobile ? "none" : "blur(0px)",
      };
    }

    if (isAnyHovered) {
      let shiftX = 0;
      if (!isMobile) {
        if (hoveredIndex !== null && index < hoveredIndex) shiftX = -38;
        if (hoveredIndex !== null && index > hoveredIndex) shiftX = 38;
      }

      return {
        rotate: 0,
        y: isMobile ? 4 : 14,
        x: shiftX,
        scale: isMobile ? 0.98 : 0.95,
        zIndex: BASE_STACK[index].zIndex,
        opacity: 0.45,
        filter: isMobile ? "none" : "blur(6px)",
      };
    }

    return {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      zIndex: BASE_STACK[index].zIndex,
      opacity: 1,
      filter: isMobile ? "none" : "blur(0px)",
    };
  };

  return (
    <section
      ref={sectionRef}
      id="cards-section"
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-16 sm:py-32 px-4 sm:px-10 md:px-14 lg:px-20 xl:px-28 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-[94rem] mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 xl:gap-14">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-6 w-full lg:w-5/12 xl:w-4/12 shrink-0 z-10">
          <motion.h2
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 20,
              mass: 0.8,
              delay: 0.1,
            }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black font-mono tracking-tighter text-neutral-900 dark:text-neutral-100 leading-[0.95] drop-shadow-sm text-center sm:text-left"
          >
            Discover <br className="hidden sm:block" />
            My World
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
            className="text-sm sm:text-lg md:text-xl font-normal text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed text-center sm:text-left"
          >
            Hover over any fanned card on the deck to lift it up and explore my background, projects, and experiences.
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: deckOpacity, y: deckY }}
          className="w-full lg:w-7/12 xl:w-8/12 flex items-center justify-center lg:justify-end z-20"
        >
          <div className="relative flex flex-col sm:flex-row items-center justify-center lg:justify-end space-y-4 sm:space-y-0 sm:-space-x-12 md:-space-x-16 lg:-space-x-20 xl:-space-x-24 w-full pt-4 sm:pt-8 pb-8 sm:pb-14">
            {CARDS_DATA.map((card, index) => {
              const IconComp = card.icon;
              const isHovered = hoveredIndex === index;
              const scrollX = isMobile ? 0 : (index === 0 ? leftXSpread : index === 2 ? rightXSpread : 0);
              const scrollY = isMobile ? 0 : (index === 0 ? leftY : index === 2 ? rightY : centerY);
              const scrollRotate = isMobile ? 0 : (index === 0 ? leftRotate : index === 2 ? rightRotate : 0);
              const baseZ = BASE_STACK[index].zIndex;
              const floatConfig = FLOAT_CONFIGS[index];

              return (
                <motion.div
                  key={card.id}
                  style={{ x: scrollX, y: scrollY, rotate: scrollRotate, zIndex: isHovered ? 50 : baseZ }}
                  className="relative w-full max-w-[360px] sm:max-w-none sm:w-[320px] md:w-[350px] lg:w-[360px] xl:w-[390px] shrink-0"
                >
                  <motion.div
                    animate={
                      isHovered || isMobile
                        ? { y: 0, rotate: 0 }
                        : {
                            y: floatConfig.y,
                            rotate: floatConfig.rotate,
                          }
                    }
                    transition={
                      isHovered || isMobile
                        ? { duration: 0.12, ease: "easeOut" }
                        : {
                            duration: floatConfig.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="w-full h-full"
                  >
                    <div
                      className="relative w-full h-full"
                      onMouseEnter={() => handleHover(index)}
                      onMouseLeave={() => handleHover(null)}
                    >
                      <motion.div
                        id={card.id}
                        animate={getCardAnimate(index)}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 14,
                          mass: 0.7,
                        }}
                        onClick={() => {
                          if (card.id === "about" && onOpenAboutPage) {
                            onOpenAboutPage();
                          } else if (card.id === "projects" && onOpenProjectsPage) {
                            onOpenProjectsPage();
                          } else if (card.id === "experiences" && onOpenExperiencePage) {
                            onOpenExperiencePage();
                          } else {
                            setSelectedCard(card);
                          }
                        }}
                        style={{
                          backdropFilter: isMobile ? "none" : "blur(12px) saturate(160%)",
                          WebkitBackdropFilter: isMobile ? "none" : "blur(12px) saturate(160%)",
                        }}
                        className={`group relative flex flex-col justify-between p-6 sm:p-8 md:p-9 w-full rounded-3xl backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-200 cursor-pointer overflow-hidden ${
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

                        <div className="flex flex-col justify-between h-full w-full space-y-4 sm:space-y-6">
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
                              <IconComp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.9]" />
                            </motion.div>
                            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                              {card.tag}
                            </span>
                          </div>

                          <div className="flex flex-col space-y-1 sm:space-y-1.5">
                            <h3 className="text-2xl sm:text-3xl font-sans font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                              {card.title}
                            </h3>
                            <p className="text-xs sm:text-sm font-sans font-medium text-neutral-500 dark:text-neutral-400">
                              {card.subtitle}
                            </p>
                          </div>

                          <p className="text-sm font-sans text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            {card.description}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-1">
                            {card.badges.map((badge, bIdx) => (
                              <span
                                key={bIdx}
                                className="px-3.5 py-1 rounded-full text-xs font-sans font-medium bg-neutral-900/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 border border-neutral-900/10 dark:border-white/15"
                              >
                                {badge}
                              </span>
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
                            className="pt-4 flex items-center gap-2 text-neutral-900 dark:text-white font-sans font-semibold text-sm"
                          >
                            <span>Explore {card.title}</span>
                            <IconArrowRight className="w-4 h-4 stroke-[2.4]" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedCard(null)}
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
                onClick={() => setSelectedCard(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900/5 dark:bg-white/10 hover:bg-neutral-900/10 dark:hover:bg-white/20 text-neutral-900 dark:text-white transition-colors cursor-pointer"
              >
                <IconX className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold border ${selectedCard.badgeBg}`}>
                  {selectedCard.tag}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-mono font-black text-neutral-900 dark:text-neutral-100 mb-2">
                {selectedCard.modalContent.heading}
              </h3>

              <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                {selectedCard.modalContent.details}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Key Highlights
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedCard.modalContent.highlights.map((item, idx) => (
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
                  onClick={() => setSelectedCard(null)}
                  className="px-6 py-3 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-mono font-bold text-sm shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Close Detail
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ThreeCardsSection;
