import { useRef, useState, useEffect, type ReactNode, type MouseEvent, type RefObject } from "react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { trackLiquidGlassPointer, resetLiquidGlassPointer } from "@/lib/liquid-glass";
import type { DockItem } from "@/types/navigation";

export type { DockItem };

interface FloatingDockProps {
  items: DockItem[];
  mobileItems?: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}

export function FloatingDock({
  items,
  mobileItems,
  desktopClassName,
  mobileClassName,
}: FloatingDockProps) {
  const { isDark } = useTheme();

  return (
    <>
      <FloatingDockDesktop items={items} isDark={isDark} className={desktopClassName} />
      <FloatingDockMobile items={mobileItems || items} isDark={isDark} className={mobileClassName} />
    </>
  );
}

function FloatingDockMobile({
  items,
  className,
}: {
  items: DockItem[];
  isDark?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.32 }}
      layout
      className={cn(
        "relative block md:hidden z-50 flex items-center rounded-[28px] liquid-glass text-neutral-900 dark:text-white p-2 overflow-hidden max-w-[calc(100vw-1.25rem)]",
        className
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle Navigation Dock"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform active:scale-95 z-10 cursor-pointer"
      >
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <IconLayoutNavbarCollapse className="h-6 w-6" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          width: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth max-w-[calc(100vw-5rem)]"
      >
        <div className="flex items-center gap-2 pl-1.5 pr-2 py-0.5">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.onClick ? "#" : item.href}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick(e);
                }
              }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full liquid-glass-item active:scale-90 transition-transform text-neutral-900 dark:text-white cursor-pointer"
              title={item.title}
            >
              <div className="h-5.5 w-5.5 flex items-center justify-center">{item.icon}</div>
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FloatingDockDesktop({
  items,
  isDark,
  className,
}: {
  items: DockItem[];
  isDark?: boolean;
  className?: string;
}) {
  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef<HTMLDivElement>(null);
  const dockCenterRef = useRef<number>(0);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const updateDockCenter = () => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      dockCenterRef.current = rect.left + rect.width / 2;
    }
  };

  useEffect(() => {
    updateDockCenter();
    window.addEventListener("resize", updateDockCenter, { passive: true });
    return () => window.removeEventListener("resize", updateDockCenter);
  }, []);

  return (
    <motion.div
      ref={dockRef}
      onPointerEnter={updateDockCenter}
      onPointerMove={(e) => {
        mouseX.set(e.clientX);
        trackLiquidGlassPointer(e);
      }}
      onPointerLeave={(e) => {
        mouseX.set(Infinity);
        setHoveredHref(null);
        resetLiquidGlassPointer(e);
      }}
      className={cn(
        "relative mx-auto hidden h-[76px] items-end gap-4 rounded-[30px] px-4 pb-3 md:flex liquid-glass transform-gpu",
        className
      )}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: 15, scale: 0.75 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 24,
            delay: 0.35 + index * 0.04,
          }}
        >
          <IconContainer
            mouseX={mouseX}
            dockCenterRef={dockCenterRef}
            index={index}
            count={items.length}
            isDark={isDark}
            isHovered={hoveredHref === item.href}
            onHoverChange={(hovered) => {
              if (hovered) setHoveredHref(item.href);
              else if (hoveredHref === item.href) setHoveredHref(null);
            }}
            {...item}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Dock magnification tuning (macOS-like 60fps+ performance)
const ICON_BASE = 52;
const ICON_MAX = 84;
const ICON_GAP = 16; // keep in sync with `gap-4` on the dock
const FALLOFF_SIGMA = 72;
const DOCK_SPRING = { mass: 0.1, stiffness: 290, damping: 20 };

function IconContainer({
  mouseX,
  dockCenterRef,
  index,
  count,
  title,
  icon,
  href,
  onClick,
  isHovered,
  onHoverChange,
}: {
  mouseX: MotionValue<number>;
  dockCenterRef: RefObject<number>;
  index: number;
  count: number;
  title: string;
  icon: ReactNode;
  href: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  isDark?: boolean;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Distance is measured from the cached resting center of each icon.
  // Zero layout thrashing / zero getBoundingClientRect calls during mouse move!
  const targetSize = useTransform(mouseX, (val) => {
    if (!Number.isFinite(val)) return ICON_BASE;
    const dockCenter = dockCenterRef.current;
    if (!dockCenter) return ICON_BASE;
    const restCenter = dockCenter + (index - (count - 1) / 2) * (ICON_BASE + ICON_GAP);
    const d = val - restCenter;
    const influence = Math.exp(-(d * d) / (2 * FALLOFF_SIGMA * FALLOFF_SIGMA));
    return ICON_BASE + (ICON_MAX - ICON_BASE) * influence;
  });

  const size = useSpring(targetSize, DOCK_SPRING);
  // Scale the inner icon via GPU transform instead of resizing SVG bounding box
  const iconScale = useTransform(size, [ICON_BASE, ICON_MAX], [1, 1.48]);

  return (
    <a
      href={onClick ? "#" : href}
      onClick={(e) => {
        onHoverChange(true);
        mouseX.set(e.clientX);
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      className="group relative"
    >
      <motion.div
        ref={ref}
        id={href === "#theme" ? "dock-theme-toggle" : undefined}
        data-dock-theme={href === "#theme" ? "true" : undefined}
        whileTap={{ scale: 0.88 }}
        style={{
          width: size,
          height: size,
        }}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full liquid-glass-item text-neutral-900 dark:text-white cursor-pointer transform-gpu will-change-[width,height]"
        )}
      >
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: 4, scale: 0.85, x: "-50%" }}
              transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.8 }}
              className="absolute -top-12 left-1/2 w-fit rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-mono font-bold tracking-wide whitespace-pre z-50 pointer-events-none liquid-glass text-neutral-900 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ rotate: -50, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 50, scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            style={{ scale: iconScale }}
            className="w-7 h-7 flex items-center justify-center pointer-events-none transform-gpu"
          >
            {icon}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </a>
  );
}
