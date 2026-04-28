"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  Clapperboard,
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

export function Sidebar() {
  const pathname = usePathname();
  const { copy } = useLanguageCopy();
  const modulesCopy = copy.modules as Record<NavLabelKey, string>;

  return (
    <aside className="w-72 border-r border-white/10 bg-gradient-to-b from-[#0a1020] via-[#090f1b] to-[#070b14] p-4">
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
            <Link key={item.href} href={item.href} className="block">
              <motion.div
                whileHover={{ x: 2, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 520, damping: 22, duration: 0.12 }}
                className={[
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors duration-150",
                  isActive
                    ? "border-emerald-400/70 bg-emerald-500/25 text-white"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-emerald-300/50 hover:bg-emerald-400/10 hover:text-white",
                ].join(" ")}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-xs text-slate-200">
                  <Icon size={14} />
                </span>
                <span>{modulesCopy[item.labelKey]}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
