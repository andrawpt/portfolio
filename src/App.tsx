import "./App.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import Lenis from "lenis";

import { FloatingDock } from "@/components/ui/FloatingDock";
import { AppleHelloEffect } from "@/components/ui/AppleHelloEffect";
import TextType from "@/components/ui/TextType";
import RotatingText from "@/components/ui/RotatingText";
import { ColorThemeProvider, useColorTheme } from "@/contexts/ColorThemeContext";
import { ContactModal } from "@/components/ui/ContactModal";
import CardNav from "@/components/ui/CardNav";
import { useTheme } from "@/hooks/use-theme";
import ThreeCardsSection from "@/features/home/ThreeCardsSection";
import AboutMePage from "@/features/about/AboutMePage";
import ProjectsShowcase from "@/features/projects/ProjectsShowcase";
import ExperienceShowcase from "@/features/experience/ExperienceShowcase";
import { GetStartedButton } from "@/features/home/components/GetStartedButton";
import { CARD_NAV_ITEMS } from "@/lib/navigation";
import type { DockItem } from "@/types/navigation";

import {
  IconHome,
  IconUser,
  IconCode,
  IconBriefcase,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

const pageContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.07,
      staggerDirection: -1,
      when: "afterChildren",
      duration: 0.15,
    },
  },
};

const kineticItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.94,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 20,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: -35,
    scale: 0.92,
    filter: "blur(12px)",
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function AppContent() {
  const [showUI, setShowUI] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { theme } = useColorTheme();
  const { isDark, toggleTheme } = useTheme();
  const [activePage, setActivePage] = useState<"home" | "about" | "projects" | "experience">("home");

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUI(true);
      setIntroFinished(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [activePage]);

  const handleNavigate = useCallback(
    (target: "home" | "about" | "projects" | "experience") => {
      if (activePage === target) {
        const currentScroll = window.scrollY || (lenisRef.current ? lenisRef.current.scroll : 0);
        if (currentScroll > 20) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { duration: 0.8 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
        return;
      }

      const currentScroll = window.scrollY || (lenisRef.current ? lenisRef.current.scroll : 0);
      if (currentScroll > 20) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { duration: 0.4 });
        }
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => {
          setActivePage(target);
        }, 350);
      } else {
        setActivePage(target);
      }
    },
    [activePage]
  );

  const navigateToAbout = useCallback(() => handleNavigate("about"), [handleNavigate]);
  const navigateToProjects = useCallback(() => handleNavigate("projects"), [handleNavigate]);
  const navigateToExperience = useCallback(() => handleNavigate("experience"), [handleNavigate]);
  const navigateToHome = useCallback(() => handleNavigate("home"), [handleNavigate]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      if (href === "#about") {
        e.preventDefault();
        e.stopPropagation();
        handleNavigate("about");
      } else if (href === "#projects") {
        e.preventDefault();
        e.stopPropagation();
        handleNavigate("projects");
      } else if (href === "#experience") {
        e.preventDefault();
        e.stopPropagation();
        handleNavigate("experience");
      } else if (href === "#contact") {
        e.preventDefault();
        e.stopPropagation();
        setContactOpen(true);
      } else if (href === "#home") {
        e.preventDefault();
        e.stopPropagation();
        handleNavigate("home");
      }
    };

    window.addEventListener("click", handleGlobalClick, true);
    return () => window.removeEventListener("click", handleGlobalClick, true);
  }, [handleNavigate]);

  const scrollToCardsSection = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo("#cards-section", {
        duration: 2.2,
        easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
      });
    } else {
      const cardsSection = document.getElementById("cards-section");
      if (cardsSection) {
        cardsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const dockItems: DockItem[] = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full" />,
      href: "#home",
      onClick: () => handleNavigate("home"),
    },
    {
      title: "Profile",
      icon: <IconUser className="h-full w-full" />,
      href: "#about",
      onClick: () => handleNavigate("about"),
    },
    {
      title: "Projects",
      icon: <IconCode className="h-full w-full" />,
      href: "#projects",
      onClick: () => handleNavigate("projects"),
    },
    {
      title: "Experience",
      icon: <IconBriefcase className="h-full w-full" />,
      href: "#experience",
      onClick: () => handleNavigate("experience"),
    },
    {
      title: isDark ? "Light Mode" : "Dark Mode",
      icon: isDark ? <IconSun className="h-full w-full" /> : <IconMoon className="h-full w-full" />,
      href: "#theme",
      onClick: (e?: any) => {
        toggleTheme(e);
      },
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full" />,
      href: "https://github.com/andrawpt",
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-full w-full" />,
      href: "https://instagram.com/andrawpz",
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full" />,
      href: "https://linkedin.com/in/andrawpt",
    },
  ];

  const mobileDockItems = dockItems.slice(0, 5);

  return (
    <div
      className={`relative w-full min-h-screen overflow-x-hidden ${
        !introFinished ? "overflow-y-hidden max-h-screen" : ""
      } bg-white dark:bg-[#050508] text-neutral-900 dark:text-neutral-100 transition-colors duration-500`}
    >
      <AnimatePresence>
        {!introFinished && (
          <motion.div
            key="intro-curtain"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(20px)",
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[900] flex flex-col items-center justify-center bg-white dark:bg-[#050508] pointer-events-auto overflow-hidden"
          >
            <AppleHelloEffect
              speed={1.5}
              onComplete={() => {
                setTimeout(() => {
                  setShowUI(true);
                  setIntroFinished(true);
                }, 1000);
              }}
              className="text-black dark:text-white h-16 sm:h-24 md:h-32 transition-all duration-300 relative z-10"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showUI && (
        <motion.div
          initial={{ opacity: 0, y: -45, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 24,
            mass: 0.8,
            delay: 0.2,
          }}
          className="fixed top-0 inset-x-0 z-[1000] pointer-events-none"
        >
          <CardNav
            items={CARD_NAV_ITEMS}
            baseColor={undefined}
            menuColor={undefined}
            buttonBgColor={theme.primary}
            buttonTextColor="#fff"
            ease="elastic.out(1, 0.8)"
          />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {activePage === "about" ? (
          <motion.div
            key="about-page"
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full transform-gpu will-change-transform"
          >
            <AboutMePage
              onBack={navigateToHome}
              onOpenContact={() => setContactOpen(true)}
            />
          </motion.div>
        ) : activePage === "projects" ? (
          <motion.div
            key="projects-page"
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full transform-gpu will-change-transform"
          >
            <ProjectsShowcase
              onBack={navigateToHome}
            />
          </motion.div>
        ) : activePage === "experience" ? (
          <motion.div
            key="experience-page"
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full transform-gpu will-change-transform"
          >
            <ExperienceShowcase
              onBack={navigateToHome}
            />
          </motion.div>
        ) : (
          <motion.div
            key="home-page"
            variants={pageContainerVariants}
            initial="hidden"
            animate={showUI ? "visible" : "hidden"}
            exit="exit"
            className="w-full transform-gpu will-change-transform"
          >
            <section id="home" className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-16 sm:py-20 overflow-hidden">
              <div className="w-full max-w-[92rem] grid grid-cols-1 md:grid-cols-[1.75fr_0.25fr] gap-8 lg:gap-16 items-center relative z-10">
                <div className="flex flex-col items-center sm:items-start space-y-4 sm:space-y-6 min-w-0 text-center sm:text-left">
                  <div className="flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
                    <motion.div
                      variants={kineticItemVariants}
                      className="w-full text-center sm:text-left overflow-hidden"
                    >
                      {showUI && (
                        <TextType
                          key="hero-text-type"
                          text={[
                            "Hello, I'm Andra",
                            "AI Engineer",
                            "RAG & Agentic AI",
                            "Informatics at ITS",
                          ]}
                          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-neutral-900 dark:text-neutral-100 font-mono leading-[1.1] md:leading-none drop-shadow-sm text-center sm:text-left"
                          typingSpeed={110}
                          deletingSpeed={45}
                          pauseDuration={2800}
                          showCursor={true}
                        />
                      )}
                    </motion.div>

                    <div className="flex flex-col items-center sm:items-start space-y-5 sm:space-y-6 pt-1">
                      <motion.div
                        variants={kineticItemVariants}
                        className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3.5"
                      >
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-neutral-800 dark:text-neutral-200 font-mono leading-tight md:leading-none shrink-0 text-center sm:text-left">
                          I'm passionate about
                        </span>
                        {showUI && (
                          <RotatingText
                            texts={[
                              "RAG & LLMs",
                              "Agentic AI",
                              "Machine Learning",
                              "Data Analysis",
                            ]}
                            mainClassName="px-3.5 py-1.5 sm:px-5 sm:py-2.5 overflow-hidden rounded-xl sm:rounded-2xl text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter font-mono leading-tight md:leading-none w-fit border backdrop-blur-2xl bg-white/10 dark:bg-white/5 border-white/30 dark:border-white/15 text-neutral-900 dark:text-white shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.4),0_8px_24px_rgba(0,0,0,0.1)] relative whitespace-nowrap"
                            staggerFrom={"first"}
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-120%", opacity: 0 }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 26, stiffness: 380 }}
                            rotationInterval={2200}
                            animatePresenceMode="popLayout"
                          />
                        )}
                      </motion.div>

                      <motion.p
                        variants={kineticItemVariants}
                        className="text-lg sm:text-xl md:text-2xl font-normal text-neutral-700 dark:text-neutral-300 font-sans max-w-2xl leading-relaxed pt-1 text-center sm:text-left mx-auto sm:mx-0"
                      >
                        Informatics student at ITS with 2 years AI Engineer experience specializing in RAG workflows, agentic AI systems, machine learning pipelines, and data analysis.
                      </motion.p>

                      <motion.div
                        variants={kineticItemVariants}
                        className="pt-3 flex justify-center sm:justify-start"
                      >
                        <GetStartedButton onClick={scrollToCardsSection} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <motion.div variants={kineticItemVariants}>
              <ThreeCardsSection
                onOpenAboutPage={navigateToAbout}
                onOpenProjectsPage={navigateToProjects}
                onOpenExperiencePage={navigateToExperience}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {showUI && (
        <motion.div
          initial={{ opacity: 0, y: 55, scale: 0.82, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
            mass: 0.8,
            delay: 0.32,
          }}
          className="fixed bottom-4 sm:bottom-6 inset-x-0 mx-auto w-fit z-50 flex justify-center pointer-events-auto"
        >
          <FloatingDock items={dockItems} mobileItems={mobileDockItems} />
        </motion.div>
      )}
    </div>
  );
}

function App() {
  return (
    <ColorThemeProvider>
      <AppContent />
    </ColorThemeProvider>
  );
}

export default App;

