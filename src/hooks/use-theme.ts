import { useEffect, useState, useCallback } from "react";

let globalIsDark = false;
if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    globalIsDark = savedTheme === "dark";
  } else {
    globalIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  if (globalIsDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

const listeners = new Set<(isDark: boolean) => void>();

function notifyListeners(newIsDark: boolean) {
  globalIsDark = newIsDark;
  listeners.forEach((listener) => listener(newIsDark));
}

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return globalIsDark;
  });

  useEffect(() => {
    const handleThemeChange = (val: boolean) => {
      setIsDark(val);
    };

    listeners.add(handleThemeChange);

    const currentDomIsDark = document.documentElement.classList.contains("dark");
    if (currentDomIsDark !== isDark) {
      setIsDark(currentDomIsDark);
      globalIsDark = currentDomIsDark;
    }

    const observer = new MutationObserver(() => {
      const domDark = document.documentElement.classList.contains("dark");
      if (domDark !== globalIsDark) {
        notifyListeners(domDark);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const nextDark = e.matches;
        document.documentElement.classList.toggle("dark", nextDark);
        notifyListeners(nextDark);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      listeners.delete(handleThemeChange);
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [isDark]);

  const toggleTheme = useCallback((_e?: unknown) => {
    const nextDark = !document.documentElement.classList.contains("dark");

    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    notifyListeners(nextDark);
  }, []);

  return { isDark, toggleTheme };
}
