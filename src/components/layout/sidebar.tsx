"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeDollarSign,
  Clapperboard,
  X,
  Flame,
  LayoutDashboard,
  ListChecks,
  Menu,
  NotebookPen,
  Plane,
  SquareCheckBig,
} from "lucide-react";
import { useLanguageCopy } from "@/lib/i18n";
import { useMemo, useState } from "react";

const workNav = [
  { href: "/organize/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
  { href: "/organize/lists", labelKey: "lists", icon: ListChecks },
  { href: "/organize/todos", labelKey: "todos", icon: SquareCheckBig },
  { href: "/organize/expenses", labelKey: "expenses", icon: BadgeDollarSign },
] as const;

const lifeNav = [
  { href: "/lifestyle/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
  { href: "/lifestyle/recipes", labelKey: "recipes", icon: NotebookPen },
  { href: "/lifestyle/calories", labelKey: "calories", icon: Flame },
  { href: "/lifestyle/trips", labelKey: "trips", icon: Plane },
  { href: "/lifestyle/movies", labelKey: "movies", icon: Clapperboard },
] as const;

type NavLabelKey = (typeof workNav)[number]["labelKey"] | (typeof lifeNav)[number]["labelKey"];

function SidebarNav({ onNavigate, space = "organize", mobile = false, expanded = true }: { onNavigate?: () => void; space?: "organize" | "lifestyle"; mobile?: boolean; expanded?: boolean }) {
  const pathname = usePathname();
  const { copy } = useLanguageCopy();
  const modulesCopy = copy.modules as Record<NavLabelKey, string>;
  const nav = space === "organize" ? workNav : lifeNav;

  return (
    <>
      <nav className="space-y-1 px-2">
        {nav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="block" onClick={onNavigate}>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                className={[
                  "pulse-sidebar-link",
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-150",
                  isActive
                    ? "pulse-sidebar-active bg-white/10 text-white border border-white/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                <span className="pulse-sidebar-icon flex h-6 w-6 shrink-0 items-center justify-center">
                  <Icon size={18} />
                </span>
                <span className={`truncate ${mobile || expanded ? "" : "hidden"}`}>{modulesCopy[item.labelKey]}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export function Sidebar({
  mobile = false,
  onClose,
  open = false,
}: {
  mobile?: boolean;
  onClose?: () => void;
  open?: boolean;
}) {
  const pathname = usePathname();
  const space = useMemo<"organize" | "lifestyle">(() => {
    return pathname.startsWith("/lifestyle") ? "lifestyle" : "organize";
  }, [pathname]);
  const [expanded, setExpanded] = useState(false);

  if (mobile) {
    return (
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="pulse-sidebar fixed left-0 top-0 z-[80] h-dvh w-[min(20rem,88vw)] overflow-y-auto border-r border-white/10 bg-gradient-to-b from-[#0a1020] via-[#090f1b] to-[#070b14] p-4 shadow-[24px_0_70px_rgba(0,0,0,0.35)] lg:hidden"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
              <SidebarNav onNavigate={onClose} space={space} mobile />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    );
  }

  return (
    <aside
      className={`pulse-sidebar sticky top-0 hidden h-screen shrink-0 overflow-hidden border-r border-white/10 bg-gradient-to-b from-[#0a1020] via-[#090f1b] to-[#070b14] lg:flex lg:flex-col transition-all duration-300 ${expanded ? "w-64" : "w-16"}`}
    >
      {/* Header with Logo and Toggle - same structure in both states */}
      <div className={`flex h-16 shrink-0 items-center px-3 ${expanded ? "justify-between" : "justify-center"}`}>
        {!expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Expand sidebar"
          >
            <Menu size={20} />
          </button>
        ) : (
          <>
            <span className="pulse-wordmark text-2xl">Pulse</span>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-slate-400 transition hover:bg-white/20 hover:text-white"
              aria-label="Collapse sidebar"
            >
              <span className="text-xs">‹</span>
            </button>
          </>
        )}
      </div>

      {/* Nav starts at same position in both states */}
      <div className="flex-1 overflow-y-auto pt-2">
        <SidebarNav space={space} expanded={expanded} />
      </div>
    </aside>
  );
}
