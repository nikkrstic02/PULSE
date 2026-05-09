"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  PenLine,
  FolderKanban,
  BarChart3,
  ArrowDown,
  CalendarCheck,
  Target,
  Wallet,
  StickyNote,
  Briefcase,
  Heart,
  UtensilsCrossed,
  Clapperboard,
  Plane,
  Home,
} from "lucide-react";
import { useLanguageCopy } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export function HomeContent() {
  const { copy } = useLanguageCopy();
  const home = copy.home;

  return (
    <main className="pulse-auth-shell min-h-screen overflow-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-10">
        {/* Animated Background Gradients */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-violet-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-sky-500/10 via-transparent to-emerald-500/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Rotating Circle Background */}
        <motion.div
          aria-hidden
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(52,211,153,0.24),rgba(56,189,248,0.18),rgba(251,191,36,0.16),rgba(52,211,153,0.24))] opacity-60 blur-sm"
        />

        {/* Floating Particles */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-violet-400 rounded-full blur-sm"
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <span className="pulse-wordmark pulse-wordmark-glow text-5xl sm:text-7xl lg:text-8xl font-black inline-block">
              Pulse
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm">
              <Sparkles size={14} className="text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
                {home.welcome}
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pulse-headline-reveal text-4xl sm:text-6xl lg:text-7xl font-black leading-tight text-white mb-6"
          >
            {home.mainHeadline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {home.mainDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/register"
              className="pulse-action-button pulse-action-primary inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-emerald-400 text-slate-950 font-black text-base shadow-[0_18px_50px_rgba(52,211,153,0.22)] hover:bg-emerald-300 transition-all"
            >
              {home.getStarted}
            </Link>
            <Link
              href="/login"
              className="pulse-action-button pulse-action-ghost inline-flex items-center justify-center px-10 py-4 rounded-2xl border border-white/15 bg-white/5 text-slate-100 font-semibold text-base hover:bg-white/10 transition-all"
            >
              {home.explore}
            </Link>
          </motion.div>
        </div>

        {/* Scroll Cue with Arrow */}
        <motion.button
          type="button"
          onClick={() => {
            document.getElementById("features")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.8, ease: "easeOut" }}
          className="pulse-scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-0 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400 transition hover:text-white cursor-pointer"
        >
          <span>Scroll</span>
          <div className="animate-[bounce-arrow_0.8s_ease-in-out_infinite_alternate]">
            <ArrowDown size={20} strokeWidth={1.8} />
          </div>
        </motion.button>
      </section>

      {/* How It Works Section */}
      <section id="features" className="py-24 px-4 sm:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Three simple steps to get your life in flow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: PenLine,
                title: "Capture",
                description: "Quickly add anything that comes to mind before it slips away",
              },
              {
                icon: FolderKanban,
                title: "Organize",
                description: "Sort everything into work and life spaces with smart categories",
              },
              {
                icon: BarChart3,
                title: "Understand",
                description: "Get AI insights to optimize your daily flow and priorities",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className="ken-stat-card rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="p-8">
                  <step.icon size={28} className="text-emerald-300 mb-6" />
                  <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Spaces Section */}
      <section className="py-24 px-4 sm:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Two Spaces, One Ecosystem
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              One side for getting things done and one for living your best life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Pulse Organize",
                description: "Everything you need to stay productive",
                modules: [
                  { icon: CalendarCheck, label: "Tasks & Time" },
                  { icon: Target, label: "Habits & Goals" },
                  { icon: Wallet, label: "Finance" },
                  { icon: StickyNote, label: "Lists & Notes" },
                  { icon: Briefcase, label: "Work & Projects" },
                ],
                accent: "text-cyan-300",
                loginUrl: "/login/organize",
                btnClass: "bg-cyan-400 hover:bg-cyan-300 text-slate-950",
              },
              {
                title: "Pulse Lifestyle",
                description: "Make the most of your free time",
                modules: [
                  { icon: Heart, label: "Health & Fitness" },
                  { icon: UtensilsCrossed, label: "Food & Recipes" },
                  { icon: Clapperboard, label: "Entertainment" },
                  { icon: Plane, label: "Travel" },
                  { icon: Home, label: "Life Management" },
                ],
                accent: "text-emerald-300",
                loginUrl: "/login/lifestyle",
                btnClass: "bg-emerald-400 hover:bg-emerald-300 text-slate-950",
              },
            ].map((space, index) => (
              <motion.div
                key={space.title}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className="pulse-edge-card rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="p-8">
                  <h3 className={`text-3xl sm:text-4xl font-black mb-3 ${space.accent}`}>{space.title}</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">{space.description}</p>
                  <div className="space-y-2">
                    {space.modules.map((mod) => (
                      <div
                        key={mod.label}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      >
                        <mod.icon size={18} strokeWidth={1.5} className={space.accent} />
                        <span className="text-white font-medium">{mod.label}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={space.loginUrl}
                    className={`mt-8 inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-bold text-sm transition-all ${space.btnClass}`}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
