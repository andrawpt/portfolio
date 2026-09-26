import { useState, useRef, useEffect } from "react";
import { useInView } from "motion/react";

interface CounterNumberProps {
  value: string;
  duration?: number;
}

export function CounterNumber({ value, duration = 1500 }: CounterNumberProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) {
      setDisplayValue("0");
      return;
    }

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isDecimal = match[1].includes(".");

    let startTimestamp: number | null = null;

    const animateStep = (currentTimestamp: number) => {
      if (!startTimestamp) startTimestamp = currentTimestamp;
      const elapsedProgress = Math.min((currentTimestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - elapsedProgress, 3);
      const interpolatedValue = easedProgress * targetNumber;

      if (isDecimal) {
        const decimalPlaces = match[1].split(".")[1]?.length || 1;
        setDisplayValue(interpolatedValue.toFixed(decimalPlaces) + suffix);
      } else {
        setDisplayValue(Math.floor(interpolatedValue).toString() + suffix);
      }

      if (elapsedProgress < 1) {
        requestAnimationFrame(animateStep);
      }
    };

    const animationFrameId = requestAnimationFrame(animateStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return <span ref={elementRef}>{displayValue}</span>;
}
