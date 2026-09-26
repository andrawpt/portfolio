import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BioRevealSectionProps {
  className?: string;
  onComplete?: () => void;
}

interface CharData {
  char: string;
  globalIndex: number;
}

interface WordData {
  word: string;
  chars: CharData[];
}

export function BioRevealSection({
  className = "",
  onComplete,
}: BioRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedInnerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [pinDistance, setPinDistance] = useState<number>(3800);
  const lastYRef = useRef<number>(-99999);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateDistance = () => {
      const isMobile = window.innerWidth < 768;
      setPinDistance(isMobile ? 1800 : 3800);
    };
    updateDistance();
    window.addEventListener("resize", updateDistance);
    return () => window.removeEventListener("resize", updateDistance);
  }, []);

  const rawMainHeader = "Informatics Undergrad at ITS. Dedicated AI Engineer.";
  const rawSubHeader =
    "With 2 years of hands-on experience in AI Engineering, I architect agentic AI systems, reliable RAG workflows, and ML pipelines. I combine a strong technical foundation with analytical problem-solving and strategic leadership to deliver scalable, high-impact solutions.";

  let globalCharCounter = 0;

  const buildWordList = (text: string) => {
    return text.split(" ").map((w) => {
      const chars: CharData[] = w.split("").map((c) => {
        const cData: CharData = {
          char: c,
          globalIndex: globalCharCounter,
        };
        globalCharCounter += 1;
        return cData;
      });
      return { word: w, chars };
    });
  };

  const mainHeaderWords = buildWordList(rawMainHeader);
  const subHeaderWords = buildWordList(rawSubHeader);

  const totalChars = Math.max(1, globalCharCounter);

  const calculateProgress = (val: number, min: number, max: number) => {
    if (val <= min) return 0;
    if (val >= max) return 1;
    return (val - min) / (max - min);
  };

  const updatePinningTransform = useCallback(() => {
    if (window.innerWidth < 768 || !containerRef.current || !pinnedInnerRef.current) return;

    const scrollTop = window.scrollY;
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    const windowHeight = window.innerHeight;

    const contentHeight = pinnedInnerRef.current.offsetHeight || 460;
    const targetCenterTop = Math.max(40, (windowHeight - contentHeight) / 2);

    const pinStart = containerTop - targetCenterTop;
    const pinEnd = pinStart + pinDistance;

    let pinY = 0;
    let progress = 0;

    if (scrollTop < pinStart) {
      pinY = 0;
      progress = 0;
    } else if (scrollTop >= pinStart && scrollTop <= pinEnd) {
      pinY = scrollTop - containerTop + targetCenterTop;
      progress = calculateProgress(scrollTop, pinStart, pinEnd);
    } else {
      pinY = pinEnd - containerTop + targetCenterTop;
      progress = 1;
      if (onComplete) onComplete();
    }

    if (Math.abs(pinY - lastYRef.current) > 0.1) {
      pinnedInnerRef.current.style.transform = `translate3d(0, ${Math.round(pinY * 10) / 10}px, 0)`;
      lastYRef.current = pinY;
    }

    if (Math.abs(progress - lastProgressRef.current) > 0.002 || progress === 0 || progress === 1) {
      setScrollProgress(progress);
      lastProgressRef.current = progress;
    }
  }, [onComplete, pinDistance]);

  const lastProgressRef = useRef<number>(0);

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(updatePinningTransform);
    };

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    updatePinningTransform();

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [updatePinningTransform]);

  const getCharDominoStyle = (globalIndex: number) => {
    const activeScrollRange = 0.85;
    const charStep = activeScrollRange / totalChars;
    const charStart = 0.03 + globalIndex * charStep;
    const charEnd = Math.min(1, charStart + charStep * 2.8 + 0.018);

    const charProgress = calculateProgress(scrollProgress, charStart, charEnd);

    const rotateX = (1 - charProgress) * 88;
    const opacity = Math.min(1, Math.max(0, Math.pow(charProgress, 1.25)));

    return {
      transform: `perspective(800px) rotateX(${rotateX.toFixed(1)}deg)`,
      opacity,
      transformOrigin: "50% 100%",
      display: "inline-block",
      willChange: "transform, opacity",
      backfaceVisibility: "hidden" as const,
    };
  };

  const renderWordWithDominoChars = (w: WordData, isGradient = false) => (
    <span
      key={`word-${w.word}-${w.chars[0]?.globalIndex}`}
      className="inline-flex whitespace-nowrap mr-[0.26em] my-[0.04em]"
    >
      {w.chars.map((c) => (
        <span
          key={`char-${c.globalIndex}`}
          style={getCharDominoStyle(c.globalIndex)}
          className={
            isGradient
              ? "bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent"
              : ""
          }
        >
          {c.char}
        </span>
      ))}
    </span>
  );

  return (
    <>
      {/* Desktop View: Original 3D Domino Pinned Reveal */}
      <div
        ref={containerRef}
        id="about-bio-reveal"
        style={{ height: `${pinDistance + 600}px` }}
        className={cn("relative w-full overflow-visible hidden md:block", className)}
      >
        <div
          ref={pinnedInnerRef}
          style={{ willChange: "transform" }}
          className="relative w-full max-w-5xl mx-auto flex flex-col justify-center py-6 sm:py-10 z-20"
        >
          <div className="w-full space-y-6 sm:space-y-8 text-center sm:text-left">
            <div className="overflow-hidden py-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono tracking-tight text-neutral-900 dark:text-white leading-[1.15] text-center sm:text-left">
                {mainHeaderWords.map((w) => renderWordWithDominoChars(w, true))}
              </h1>
            </div>

            <div className="overflow-hidden text-center sm:text-left">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-4xl text-center sm:text-left mx-auto sm:mx-0">
                {subHeaderWords.map((w) => renderWordWithDominoChars(w))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / View HP (Clean Fade-In Only, No Character-by-Character / Domino) */}
      <section className="block md:hidden relative w-full py-6 text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-neutral-900 dark:text-white leading-[1.2]">
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
              {rawMainHeader}
            </span>
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
            {rawSubHeader}
          </p>
        </motion.div>
      </section>
    </>
  );
}

export default BioRevealSection;
