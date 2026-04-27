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

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lists", label: "Lists", icon: ListChecks },
  { href: "/todos", label: "To-Do", icon: SquareCheckBig },
  { href: "/expenses", label: "Expenses", icon: BadgeDollarSign },
  { href: "/recipes", label: "Recipes", icon: NotebookPen },
  { href: "/calories", label: "Calories", icon: Flame },
  { href: "/trips", label: "Trips", icon: Plane },
  { href: "/movies", label: "Movies", icon: Clapperboard },
];

export function Sidebar() {
  const pathname = usePathname();

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
                <span>{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
