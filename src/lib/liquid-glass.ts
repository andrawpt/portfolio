import type { PointerEvent } from "react";

const rectCache = new WeakMap<HTMLElement, { rect: DOMRect; timestamp: number }>();
const rafIds = new WeakMap<HTMLElement, number>();

/** Updates the pointer-following specular highlight on a `.liquid-glass` element via rAF throttling. */
export function trackLiquidGlassPointer(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const clientX = e.clientX;
  const clientY = e.clientY;

  const existingRaf = rafIds.get(el);
  if (existingRaf) {
    cancelAnimationFrame(existingRaf);
  }

  const rafId = requestAnimationFrame(() => {
    let cached = rectCache.get(el);
    const now = performance.now();
    // Refresh rect cache every 300ms to stay accurate while preventing layout thrashing
    if (!cached || now - cached.timestamp > 300) {
      cached = { rect: el.getBoundingClientRect(), timestamp: now };
      rectCache.set(el, cached);
    }
    const x = clientX - cached.rect.left;
    const y = clientY - cached.rect.top;
    el.style.setProperty("--lg-x", `${x}px`);
    el.style.setProperty("--lg-y", `${y}px`);
    rafIds.delete(el);
  });

  rafIds.set(el, rafId);
}

/** Resets the specular highlight back to the top-center resting position. */
export function resetLiquidGlassPointer(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const existingRaf = rafIds.get(el);
  if (existingRaf) {
    cancelAnimationFrame(existingRaf);
    rafIds.delete(el);
  }
  rectCache.delete(el);
  el.style.setProperty("--lg-x", "50%");
  el.style.setProperty("--lg-y", "0%");
}
