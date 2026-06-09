import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const listeners = new Set<(theme: Theme) => void>();

function readDomTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  listeners.forEach((fn) => fn(theme));
}

/**
 * Returns the current theme plus a toggle function. Multiple components
 * can call this hook and stay in sync via the module-level listeners set
 * — no Context provider needed for an app this small.
 *
 * The initial theme is read from the DOM, which the inline script in
 * index.html sets before React hydrates (avoids the white flash on dark
 * mode page load).
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readDomTheme);

  useEffect(() => {
    listeners.add(setTheme);
    return () => {
      listeners.delete(setTheme);
    };
  }, []);

  const toggle = () => applyTheme(theme === "dark" ? "light" : "dark");

  return { theme, toggle };
}
