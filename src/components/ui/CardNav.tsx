import { useLayoutEffect, useRef, useState, type FC } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";

export interface CardNavLink {
  label: string;
  href: string;
  ariaLabel: string;
}

export interface CardNavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
}

export interface CardNavProps {
  logo?: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

export const CardNav: FC<CardNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor,
  menuColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const updateDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateDarkMode();

    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const isExpandedRef = useRef(isExpanded);
  useLayoutEffect(() => {
    isExpandedRef.current = isExpanded;
  }, [isExpanded]);

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 30, opacity: 0, scale: 0.95 });

    const timeline = gsap.timeline({ paused: true });

    timeline.to(navEl, {
      height: calculateHeight,
      duration: 0.5,
      ease: ease || "power3.out",
    });

    timeline.to(
      cardsRef.current,
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", stagger: 0.06 },
      "-=0.25"
    );

    return timeline;
  };

  useLayoutEffect(() => {
    const timeline = createTimeline();
    timelineRef.current = timeline;

    if (isExpandedRef.current && timeline) {
      const newHeight = calculateHeight();
      gsap.set(navRef.current, { height: newHeight });
      gsap.set(cardsRef.current, { y: 0, opacity: 1, scale: 1 });
      timeline.progress(1);
    }

    return () => {
      timeline?.kill();
      timelineRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!timelineRef.current) return;

      if (isExpandedRef.current) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        timelineRef.current.kill();
        const newTimeline = createTimeline();
        if (newTimeline) {
          newTimeline.progress(1);
          timelineRef.current = newTimeline;
        }
      } else {
        timelineRef.current.kill();
        const newTimeline = createTimeline();
        if (newTimeline) {
          timelineRef.current = newTimeline;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      timeline.play(0);
    } else {
      setIsHamburgerOpen(false);
      if (timeline.progress() === 0) {
        setIsExpanded(false);
      } else {
        timeline.eventCallback("onReverseComplete", () => setIsExpanded(false));
        timeline.reverse();
      }
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container pointer-events-auto absolute inset-x-0 mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-140px)] max-w-[620px] z-[1000] top-3 sm:top-6 ${className}`}
    >
      <nav
        ref={navRef}
        style={{
          backdropFilter: "blur(28px) saturate(190%)",
          WebkitBackdropFilter: "blur(28px) saturate(190%)",
          ...(baseColor ? { backgroundColor: baseColor } : {}),
        }}
        className="card-nav block h-[60px] p-0 rounded-2xl border relative overflow-hidden glass-dock shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className="hamburger-menu group h-[44px] flex items-center justify-center cursor-pointer order-2 md:order-none w-[44px] transition-all duration-300 hover:opacity-75"
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
            style={{ color: menuColor || (isDark ? "#e5e5e5" : "#262626") }}
          >
            <div className="relative w-[26px] h-[18px] flex items-center justify-center">
              <div
                className={`absolute w-[26px] h-[2px] bg-current transition-all duration-300 ease-out ${
                  isHamburgerOpen ? "rotate-45" : "-translate-y-[4px]"
                } group-hover:opacity-75`}
              />
              <div
                className={`absolute w-[26px] h-[2px] bg-current transition-all duration-300 ease-out ${
                  isHamburgerOpen ? "-rotate-45" : "translate-y-[4px]"
                } group-hover:opacity-75`}
              />
            </div>
          </div>

          {logo && (
            <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
              <img src={logo} alt={logoAlt} className="logo h-[28px]" />
            </div>
          )}
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded || isHamburgerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              style={{
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
              className="nav-card select-none relative flex flex-col gap-2 p-[14px_18px] rounded-xl min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%] glass-dock-item text-neutral-900 dark:text-white transition-colors duration-200"
              ref={setCardRef(idx)}
            >
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
