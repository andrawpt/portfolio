import { useEffect } from "react";

/**
 * Renders the global SVG filter used by `.liquid-glass` for real lens-like
 * refraction of the backdrop (macOS Liquid Glass look).
 *
 * `backdrop-filter: url(...)` is only supported in Chromium, so the refraction
 * is enabled progressively via the `liquid-refraction` class on <html>.
 * Other browsers keep the blur + vibrancy + specular rim fallback.
 */
export function LiquidGlassFilter() {
  useEffect(() => {
    const nav = navigator as Navigator & {
      userAgentData?: { brands?: { brand: string }[] };
    };
    const isChromium =
      nav.userAgentData?.brands?.some((b) => b.brand === "Chromium") ?? false;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedTransparency = window.matchMedia(
      "(prefers-reduced-transparency: reduce)"
    ).matches;

    if (isChromium && finePointer && !reducedTransparency) {
      document.documentElement.classList.add("liquid-refraction");
    }
    return () => document.documentElement.classList.remove("liquid-refraction");
  }, []);

  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
    >
      <filter
        id="liquid-glass-refraction"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.004 0.009"
          numOctaves="2"
          seed="7"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="3" result="softNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softNoise"
          scale="26"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
