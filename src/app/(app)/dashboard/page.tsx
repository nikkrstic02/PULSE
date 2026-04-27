"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Bolt, CalendarDays, ChartNoAxesCombined } from "lucide-react";
import { useAuth } from "@/features/auth/context/auth-context";

const cards = [
  {
    title: "Quick Capture",
    text: "Drop tasks and notes in one frictionless command panel.",
    icon: Bolt,
  },
  {
    title: "Pulse Analytics",
    text: "Track productivity and spending trends across modules.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Plan Ahead",
    text: "Build timeline routines for trips, workouts, and priorities.",
    icon: CalendarDays,
  },
];

export default function DashboardPage() {
  const { user, refetchMe } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("google") === "success") {
      refetchMe();
      router.replace("/dashboard");
    }
  }, [refetchMe, router]);

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-400/10" />
        <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative">
          <div className="mb-4 inline-flex rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
            KEN Platform
          </div>
          <h1 className="text-4xl font-black tracking-tight">Welcome back</h1>
          <p className="mt-3 text-sm text-slate-300">Signed in as {user?.email}</p>
          <button className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10">
            Open Command Palette
            <ArrowUpRight size={14} />
          </button>
        </div>
      </motion.section>

      <section className="grid gap-5 md:grid-cols-3">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="rounded-2xl border border-white/10 bg-white/4 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur"
            >
              <div className="mb-4 inline-flex rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-100">
                <Icon size={16} />
              </div>
              <h2 className="text-lg font-bold">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{card.text}</p>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
