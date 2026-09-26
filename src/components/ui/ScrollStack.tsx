import { useLayoutEffect, useRef, useCallback, type FC, type ReactNode } from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: FC<ScrollStackItemProps> = ({ children, itemClassName = "" }) => (
  <div className="scroll-stack-card-wrapper">
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
  </div>
);

export interface ScrollStackProps {
  className?: string;
  header?: ReactNode;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  headerPosition?: string | number;
  stackPosition?: string | number;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

interface TransformCache {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
  opacity: number;
}

export const ScrollStack: FC<ScrollStackProps> = ({
  className = "",
  header,
  children,
  itemDistance = 200,
  itemScale = 0.05,
  itemStackDistance = 14,
  headerPosition = "center",
  stackPosition = "center",
  baseScale = 1,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);
  const headerTopRef = useRef<number>(0);
  const stableHeaderHeightRef = useRef<number>(120);
  const stableCardHeightRef = useRef<number>(300);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const wrappersRef = useRef<HTMLElement[]>([]);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardTopsRef = useRef<number[]>([]);
  const lastTransformsRef = useRef<Map<number, TransformCache>>(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop <= start) return 0;
    if (scrollTop >= end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement,
      };
    }
    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller ? scroller.scrollTop : 0,
      containerHeight: scroller ? scroller.clientHeight : window.innerHeight,
      scrollContainer: scroller || document.documentElement,
    };
  }, [useWindowScroll]);

  const measurePositions = useCallback(() => {
    if (headerWrapperRef.current) {
      stableHeaderHeightRef.current = headerWrapperRef.current.offsetHeight || 120;
      if (useWindowScroll) {
        headerTopRef.current = headerWrapperRef.current.getBoundingClientRect().top + window.scrollY;
      } else {
        headerTopRef.current = headerWrapperRef.current.offsetTop;
      }
    }

    if (!wrappersRef.current.length) return;

    if (wrappersRef.current[0]) {
      stableCardHeightRef.current = wrappersRef.current[0].offsetHeight || 300;
    }

    if (useWindowScroll) {
      cardTopsRef.current = wrappersRef.current.map((wrapper) => {
        if (!wrapper) return 0;
        const rect = wrapper.getBoundingClientRect();
        return rect.top + window.scrollY;
      });
    } else {
      cardTopsRef.current = wrappersRef.current.map((wrapper) => (wrapper ? wrapper.offsetTop : 0));
    }
  }, [useWindowScroll]);

  const updateTransforms = useCallback(() => {
    if (!cardsRef.current.length || !cardTopsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();

    const headerElHeight = stableHeaderHeightRef.current;
    const cardElHeight = stableCardHeightRef.current;
    const totalBlockHeight = headerElHeight + 24 + cardElHeight;
    const autoCenterTop = Math.max(70, (containerHeight - totalBlockHeight) / 2);

    const headerPositionPx =
      headerPosition === "center" ? autoCenterTop : parsePercentage(headerPosition, containerHeight);

    const stackPositionPx =
      stackPosition === "center"
        ? headerPositionPx + headerElHeight + 24
        : parsePercentage(stackPosition, containerHeight);

    const endElement = useWindowScroll
      ? (document.querySelector(".scroll-stack-end") as HTMLElement)
      : (scrollerRef.current?.querySelector(".scroll-stack-end") as HTMLElement);

    let endElementTop = 0;
    if (endElement) {
      if (useWindowScroll) {
        endElementTop = endElement.getBoundingClientRect().top + window.scrollY;
      } else {
        endElementTop = endElement.offsetTop;
      }
    }

    const totalCards = cardsRef.current.length;
    const pinEnd = endElementTop - stackPositionPx - (totalCards - 1) * itemStackDistance;

    if (headerInnerRef.current) {
      const headerTop = headerTopRef.current || 0;
      const headerPinStart = headerTop - headerPositionPx;

      const headerApproach = 380;
      const headerEntrance = calculateProgress(scrollTop, headerPinStart - headerApproach, headerPinStart);

      let headerY = 0;
      let headerOpacity = 1;
      let headerScale = 1;

      if (scrollTop < headerPinStart) {
        headerOpacity = Math.min(1, Math.max(0, Math.pow(headerEntrance, 1.25)));
        headerScale = 0.94 + 0.06 * Math.pow(headerEntrance, 0.85);
        const kineticLift = (1 - headerEntrance) * 28;
        headerY = kineticLift;
      } else if (scrollTop >= headerPinStart && scrollTop <= pinEnd) {
        headerY = scrollTop - headerTop + headerPositionPx;
      } else if (scrollTop > pinEnd) {
        headerY = pinEnd - headerTop + headerPositionPx;
      }

      headerInnerRef.current.style.transform = `translate3d(0, ${headerY}px, 0) scale(${headerScale})`;
      headerInnerRef.current.style.opacity = `${headerOpacity}`;
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardTopsRef.current[i] || 0;
      const pinOffset = stackPositionPx + itemStackDistance * i;
      const pinStart = cardTop - pinOffset;

      const headerTop = headerTopRef.current || 0;
      const headerPinStart = headerTop - headerPositionPx;

      const cardEntranceStart = Math.max(headerPinStart + 60, pinStart - itemDistance * 1.2);
      const cardEntranceEnd = Math.max(cardEntranceStart + 140, pinStart);

      const entranceProgress = calculateProgress(scrollTop, cardEntranceStart, cardEntranceEnd);

      let opacity = 1;
      let entryScaleFactor = 1;

      if (scrollTop < cardEntranceEnd) {
        opacity = Math.min(1, Math.max(0, Math.pow(entranceProgress, 1.25)));
        const bouncyProgress = entranceProgress < 0.82
          ? Math.pow(entranceProgress / 0.82, 1.15) * 1.03
          : 1.03 - ((entranceProgress - 0.82) / 0.18) * 0.03;
        entryScaleFactor = 0.92 + 0.08 * bouncyProgress;
      } else {
        opacity = 1;
        entryScaleFactor = 1;
      }

      let scaleReduction = 0;
      let blurAccumulation = 0;
      for (let j = i + 1; j < totalCards; j++) {
        const jCardTop = cardTopsRef.current[j] || 0;
        const jPinStart = jCardTop - (stackPositionPx + itemStackDistance * j);
        const jProgress = calculateProgress(scrollTop, jPinStart - itemDistance * 0.75, jPinStart);
        scaleReduction += jProgress * itemScale;
        if (blurAmount > 0) {
          blurAccumulation += jProgress * blurAmount;
        }
      }

      const scale = Math.max(0.65, (1 - scaleReduction) * entryScaleFactor);

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + pinOffset;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + pinOffset;
      }

      const transform = `translate3d(0, ${translateY}px, 0)` + (scale !== 1 ? ` scale(${scale})` : "");

      card.style.transform = transform;
      card.style.opacity = `${opacity}`;
      if (blurAmount > 0) {
        card.style.filter = blurAccumulation > 0.05 ? `blur(${blurAccumulation.toFixed(1)}px)` : "none";
      } else {
        card.style.filter = "none";
      }

      if (i === totalCards - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    headerPosition,
    stackPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      updateTransforms();
    });
  }, [updateTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return null;
    }
    const scroller = scrollerRef.current;
    if (!scroller) return null;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector(".scroll-stack-inner") as HTMLElement,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on("scroll", handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    const container = useWindowScroll ? document : scroller!;
    const wrappers = Array.from(container.querySelectorAll(".scroll-stack-card-wrapper")) as HTMLElement[];
    const cards = Array.from(container.querySelectorAll(".scroll-stack-card")) as HTMLElement[];

    wrappersRef.current = wrappers;
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    wrappers.forEach((wrapper, i) => {
      if (i < wrappers.length - 1) {
        wrapper.style.marginBottom = `${itemDistance}px`;
      }
    });

    cards.forEach((card) => {
      card.style.willChange = "transform, filter, opacity";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.perspective = "1000px";
    });

    const syncCardSizes = () => {
      if (cards.length > 0) {
        cards.forEach((card) => {
          card.style.minHeight = "";
        });
        const initialHeight = cards[0].getBoundingClientRect().height;
        if (initialHeight > 0) {
          cards.forEach((card) => {
            card.style.minHeight = `${initialHeight}px`;
          });
        }
      }
    };

    syncCardSizes();
    measurePositions();
    setupLenis();
    updateTransforms();

    const handleResize = () => {
      syncCardSizes();
      measurePositions();
      updateTransforms();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (useWindowScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      wrappersRef.current = [];
      cardsRef.current = [];
      cardTopsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, useWindowScroll, measurePositions, setupLenis, updateTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      {header && (
        <div ref={headerWrapperRef} className="scroll-stack-header-outer w-full z-30 pb-4 mb-6 flex justify-start">
          <div ref={headerInnerRef} className="scroll-stack-header-inner w-full will-change-transform">
            {header}
          </div>
        </div>
      )}
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
