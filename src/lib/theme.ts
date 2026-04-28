export type KenTheme = "dark" | "light";

const THEME_STORAGE_KEY = "ken-theme";
const THEME_CHANGE_EVENT = "ken-theme-change";

function isKenTheme(value: string | null): value is KenTheme {
  return value === "dark" || value === "light";
}

export function getPreferredTheme(): KenTheme {
  if (typeof window === "undefined") return "dark";

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (isKenTheme(storedTheme)) return storedTheme;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme: KenTheme) {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.theme = theme;
  document.body.dataset.theme = theme;
}

export function persistTheme(theme: KenTheme) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function setPreferredTheme(theme: KenTheme) {
  applyTheme(theme);
  persistTheme(theme);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }
}

export function subscribeToTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const onThemeChange = () => callback();
  window.addEventListener("storage", onThemeChange);
  window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);

  return () => {
    window.removeEventListener("storage", onThemeChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
  };
}
