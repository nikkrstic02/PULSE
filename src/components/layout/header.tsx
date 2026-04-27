"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Moon, Search, Settings, Sparkles, Sun } from "lucide-react";
import { useAuth } from "@/features/auth/context/auth-context";
import { useLogoutMutation } from "@/features/auth/queries/use-logout-mutation";

export function Header() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const logoutMutation = useLogoutMutation(() => router.replace("/"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initial = user?.email?.[0]?.toUpperCase() ?? "?";

  useEffect(() => {
    const stored = window.localStorage.getItem("ken-theme") as "dark" | "light" | null;
    const preferred = stored ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    window.localStorage.setItem("ken-theme", theme);
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
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="relative z-50 h-16 border-b border-white/10 bg-[#0a0f1a]/90 px-6 backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-4">
        <div className="flex-1">
          <label htmlFor="header-search" className="sr-only">
            Search
          </label>
          <div className="relative rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/40 focus-within:border-cyan-300/60">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="header-search"
              type="search"
              placeholder="Search..."
              className="w-full bg-transparent pl-11 text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
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
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Settings size={16} />
                      Settings
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
                      {logoutMutation.isPending ? "Logging out..." : "Logout"}
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
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
