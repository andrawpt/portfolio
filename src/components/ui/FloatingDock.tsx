import { useRef, useState, type ReactNode, type MouseEvent, type RefObject } from "react";
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
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <motion.div
      ref={dockRef}
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
        "relative mx-auto hidden h-[76px] items-end gap-4 rounded-[30px] px-4 pb-3 md:flex liquid-glass",
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
            dockRef={dockRef}
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

// Dock magnification tuning (macOS-like)
const ICON_BASE = 52;
const ICON_MAX = 84;
const ICON_GAP = 16; // keep in sync with `gap-4` on the dock
const FALLOFF_SIGMA = 72;
const DOCK_SPRING = { mass: 0.15, stiffness: 260, damping: 17 };

function IconContainer({
  mouseX,
  dockRef,
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
  dockRef: RefObject<HTMLDivElement | null>;
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

  // Distance is measured from the icon's *resting* center, derived from the dock's
  // center (which stays fixed while the dock grows symmetrically). This avoids the
  // jittery feedback loop of measuring an icon that is itself resizing.
  const targetSize = useTransform(mouseX, (val) => {
    const dock = dockRef.current;
    if (!dock || !Number.isFinite(val)) return ICON_BASE;
    const rect = dock.getBoundingClientRect();
    const dockCenter = rect.left + rect.width / 2;
    const restCenter = dockCenter + (index - (count - 1) / 2) * (ICON_BASE + ICON_GAP);
    const d = val - restCenter;
    const influence = Math.exp(-(d * d) / (2 * FALLOFF_SIGMA * FALLOFF_SIGMA));
    return ICON_BASE + (ICON_MAX - ICON_BASE) * influence;
  });

  const size = useSpring(targetSize, DOCK_SPRING);
  const iconSize = useTransform(size, (s) => s * 0.5);

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
          "relative flex aspect-square items-center justify-center rounded-full liquid-glass-item text-neutral-900 dark:text-white cursor-pointer"
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
            style={{ width: iconSize, height: iconSize }}
            className="flex items-center justify-center pointer-events-none"
          >
            {icon}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </a>
  );
}
