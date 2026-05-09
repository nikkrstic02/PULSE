"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, Heart, LogOut, Menu, Moon, Search, Settings, Sparkles, Sun } from "lucide-react";
import { useAuth } from "@/features/auth/context/auth-context";
import { useLogoutMutation } from "@/features/auth/queries/use-logout-mutation";
import { useLanguageCopy } from "@/lib/i18n";
import {
  setPreferredLanguage,
} from "@/lib/language";
import {
  applyTheme,
  getPreferredTheme,
  setPreferredTheme,
  subscribeToTheme,
  type KenTheme,
} from "@/lib/theme";

function getServerTheme(): KenTheme {
  return "dark";
}

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const logoutMutation = useLogoutMutation(() => router.replace("/"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [spaceDropdownOpen, setSpaceDropdownOpen] = useState(false);
  const spaceDropdownRef = useRef<HTMLDivElement>(null);
  const theme = useSyncExternalStore(subscribeToTheme, getPreferredTheme, getServerTheme);
  const { copy, language } = useLanguageCopy();
  const headerCopy = copy.header;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initial = user?.email?.[0]?.toUpperCase() ?? "?";
  const pathname = usePathname();
  const currentSpace = useMemo<"organize" | "lifestyle">(() => {
    return pathname?.startsWith("/lifestyle") ? "lifestyle" : "organize";
  }, [pathname]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
      if (
        spaceDropdownOpen &&
        spaceDropdownRef.current &&
        !spaceDropdownRef.current.contains(event.target as Node)
      ) {
        setSpaceDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, spaceDropdownOpen]);

  return (
    <header className="relative z-50 min-h-16 border-b border-white/10 bg-[#0a0f1a]/90 px-3 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Space Switcher */}
        <div className="relative shrink-0" ref={spaceDropdownRef}>
          <button
            type="button"
            onClick={() => setSpaceDropdownOpen((open) => !open)}
            className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center">
              {currentSpace === "organize" ? (
                <Briefcase size={18} className="text-cyan-300" />
              ) : (
                <Heart size={18} className="text-emerald-300" />
              )}
            </span>
            <span className="hidden sm:inline">
              {currentSpace === "organize" ? "Pulse Organize" : "Pulse Lifestyle"}
            </span>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${spaceDropdownOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {spaceDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1221]/95 shadow-[0_20px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
              >
                <Link
                  href={currentSpace === "organize" ? "/lifestyle/dashboard" : "/organize/dashboard"}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                  onClick={() => setSpaceDropdownOpen(false)}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                    {currentSpace === "organize" ? (
                      <Heart size={18} className="text-emerald-300" />
                    ) : (
                      <Briefcase size={18} className="text-cyan-300" />
                    )}
                  </span>
                  {currentSpace === "organize" ? "Pulse Lifestyle" : "Pulse Organize"}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="min-w-0 flex-1">
          <label htmlFor="header-search" className="sr-only">
            {headerCopy.searchLabel}
          </label>
          <div className="relative rounded-2xl border border-white/10 bg-white/5 px-3 py-3 transition hover:border-cyan-300/40 focus-within:border-cyan-300/60 sm:px-4">
            <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 sm:left-4" />
            <input
              id="header-search"
              type="search"
              placeholder={headerCopy.search}
              className="w-full min-w-0 bg-transparent pl-9 text-sm text-white placeholder:text-slate-500 focus:outline-none sm:pl-11"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              setPreferredTheme(theme === "dark" ? "light" : "dark");
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
            aria-label={headerCopy.toggleTheme}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => {
              setPreferredLanguage(language === "en" ? "sr" : "en");
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
            aria-label={headerCopy.toggleLanguage}
            title={headerCopy.toggleLanguage}
          >
            <span className="text-xs font-black">{language.toUpperCase()}</span>
          </button>
          {isLoading ? (
            <div className="h-11 w-11 animate-pulse rounded-2xl bg-white/10" />
          ) : isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-cyan-400/10 text-sm font-semibold text-white transition hover:bg-cyan-400/15"
              >
                {initial}
              </button>

              <AnimatePresence>
                {menuOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 z-50 mt-3 w-48 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1221]/95 shadow-[0_20px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
                  >
                    <Link
                      href={`/${currentSpace}/settings`}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Settings size={16} />
                      {headerCopy.settings}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        logoutMutation.mutate();
                      }}
                      disabled={logoutMutation.isPending}
                      className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                    >
                      <LogOut size={16} />
                      {logoutMutation.isPending ? headerCopy.loggingOut : headerCopy.logout}
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
            >
              <Sparkles size={16} />
              {headerCopy.login}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
