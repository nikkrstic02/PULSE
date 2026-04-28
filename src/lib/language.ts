export type KenLanguage = "en" | "sr";

const LANGUAGE_STORAGE_KEY = "ken-language";
const LANGUAGE_CHANGE_EVENT = "ken-language-change";

function isKenLanguage(value: string | null): value is KenLanguage {
  return value === "en" || value === "sr";
}

export function getPreferredLanguage(): KenLanguage {
  if (typeof window === "undefined") return "en";

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isKenLanguage(storedLanguage)) return storedLanguage;

  return "en";
}

export function setPreferredLanguage(language: KenLanguage) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
}

export function subscribeToLanguage(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const onLanguageChange = () => callback();
  window.addEventListener("storage", onLanguageChange);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onLanguageChange);

  return () => {
    window.removeEventListener("storage", onLanguageChange);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onLanguageChange);
  };
}
