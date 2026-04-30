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
  NotebookPen,
  Plane,
  SquareCheckBig,
} from "lucide-react";
import { useLanguageCopy } from "@/lib/i18n";

const nav = [
  { href: "/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
  { href: "/lists", labelKey: "lists", icon: ListChecks },
  { href: "/todos", labelKey: "todos", icon: SquareCheckBig },
  { href: "/expenses", labelKey: "expenses", icon: BadgeDollarSign },
  { href: "/recipes", labelKey: "recipes", icon: NotebookPen },
  { href: "/calories", labelKey: "calories", icon: Flame },
  { href: "/trips", labelKey: "trips", icon: Plane },
  { href: "/movies", labelKey: "movies", icon: Clapperboard },
] as const;

type NavLabelKey = (typeof nav)[number]["labelKey"];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { copy } = useLanguageCopy();
  const modulesCopy = copy.modules as Record<NavLabelKey, string>;

  return (
    <>
      <div className="mb-8 flex h-16 items-center justify-center px-2">
        <Link href="/dashboard" className="ken-wordmark text-2xl">
          KEN
        </Link>
      </div>

      <nav className="space-y-2">
        {nav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="block" onClick={onNavigate}>
              <motion.div
                whileHover={{ x: 2, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 520, damping: 22, duration: 0.12 }}
                className={[
                  "ken-sidebar-link",
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors duration-150",
                  isActive
                    ? "ken-sidebar-active border-emerald-300/90 bg-emerald-500/40 text-white"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-emerald-300/50 hover:bg-emerald-400/10 hover:text-white",
                ].join(" ")}
              >
                <span className="ken-sidebar-icon inline-flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-xs text-slate-200">
                  <Icon size={14} />
                </span>
                <span className="truncate">{modulesCopy[item.labelKey]}</span>
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
              className="ken-sidebar fixed left-0 top-0 z-[80] h-dvh w-[min(20rem,88vw)] overflow-y-auto border-r border-white/10 bg-gradient-to-b from-[#0a1020] via-[#090f1b] to-[#070b14] p-4 shadow-[24px_0_70px_rgba(0,0,0,0.35)] lg:hidden"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
              <SidebarNav onNavigate={onClose} />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    );
  }

  return (
    <aside className="ken-sidebar sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto border-r border-white/10 bg-gradient-to-b from-[#0a1020] via-[#090f1b] to-[#070b14] p-4 lg:block">
      <SidebarNav />
    </aside>
  );
}
