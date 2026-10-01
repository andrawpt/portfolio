import type { PointerEvent } from "react";

/** Updates the pointer-following specular highlight on a `.liquid-glass` element. */
export function trackLiquidGlassPointer(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--lg-x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--lg-y", `${e.clientY - rect.top}px`);
}

/** Resets the specular highlight back to the top-center resting position. */
export function resetLiquidGlassPointer(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.setProperty("--lg-x", "50%");
  el.style.setProperty("--lg-y", "0%");
}
