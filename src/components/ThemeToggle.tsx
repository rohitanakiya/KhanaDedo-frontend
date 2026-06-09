import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const Icon = theme === "dark" ? Sun : Moon;
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-emerald-300 hover:text-emerald-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
