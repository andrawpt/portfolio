import { useRef, useState, type ReactNode, type MouseEvent } from "react";
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
        "relative block md:hidden z-50 flex items-center rounded-3xl glass-dock text-neutral-900 dark:text-white p-2 transition-colors duration-300 overflow-hidden max-w-[calc(100vw-1.25rem)] shadow-2xl",
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
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full glass-dock-item active:scale-90 transition-all text-neutral-900 dark:text-white cursor-pointer shadow-md"
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
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <motion.div
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        setHoveredHref(null);
      }}
      className={cn(
        "mx-auto hidden h-20 items-end gap-5 rounded-3xl px-5 pb-3.5 md:flex glass-dock transition-all duration-300",
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
            stiffness: 340,
            damping: 20,
            delay: 0.35 + index * 0.04,
          }}
        >
          <IconContainer
            mouseX={mouseX}
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

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
  isHovered,
  onHoverChange,
}: {
  mouseX: MotionValue;
  title: string;
  icon: ReactNode;
  href: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  isDark?: boolean;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [52, 96, 52]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [52, 96, 52]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [26, 48, 26]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [26, 48, 26]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <a
      href={onClick ? "#" : href}
      onClick={(e) => {
        onHoverChange(true);
        mouseX.set(e.pageX);
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
          width,
          height,
        }}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full glass-dock-item text-neutral-900 dark:text-white transition-colors duration-150 cursor-pointer"
        )}
      >
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: 4, scale: 0.85, x: "-50%" }}
              transition={{ type: "spring", stiffness: 480, damping: 22 }}
              className="absolute -top-11 left-1/2 w-fit rounded-xl border border-white/30 dark:border-white/20 px-3 py-1.5 text-xs sm:text-sm font-mono font-bold tracking-wide whitespace-pre shadow-xl z-50 pointer-events-none glass-dock text-neutral-900 dark:text-white"
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
            transition={{ type: "spring", stiffness: 420, damping: 20 }}
            style={{ width: widthIcon, height: heightIcon }}
            className="flex items-center justify-center pointer-events-none"
          >
            {icon}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </a>
  );
}
