"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  BadgeDollarSign,
  CheckCircle2,
  Clapperboard,
  Flame,
  LayoutGrid,
  ListChecks,
  NotebookPen,
  Plane,
  Sparkles,
} from "lucide-react";
import { useLanguageCopy } from "@/lib/i18n";

const moduleIcons = [
  ListChecks,
  CheckCircle2,
  BadgeDollarSign,
  NotebookPen,
  Flame,
  Plane,
  Clapperboard,
] as const;

const accentClasses = [
  "from-sky-300/25 to-emerald-300/10 text-sky-100",
  "from-emerald-300/25 to-sky-300/10 text-emerald-100",
  "from-amber-300/25 to-orange-300/10 text-amber-100",
  "from-rose-300/25 to-violet-300/10 text-rose-100",
  "from-orange-300/25 to-amber-300/10 text-orange-100",
  "from-teal-300/25 to-emerald-300/10 text-teal-100",
  "from-violet-300/25 to-sky-300/10 text-violet-100",
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function HomeContent() {
  const { copy } = useLanguageCopy();
  const home = copy.home;

  return (
    <main className="min-h-screen overflow-hidden px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col items-center justify-center text-center">
        <motion.div
          aria-hidden
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[conic-gradient(from_180deg,rgba(52,211,153,0.24),rgba(56,189,248,0.18),rgba(251,191,36,0.16),rgba(52,211,153,0.24))] opacity-60 blur-sm"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.div>
            <Link
              href="/"
              className="ken-wordmark ken-wordmark-glow inline-block text-6xl font-black sm:text-8xl lg:text-9xl"
            >
              KEN
            </Link>
          </motion.div>

          <div className="mx-auto mt-6 flex w-fit max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100 backdrop-blur sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            <Sparkles size={14} />
            {home.welcome}
          </div>

          <h1 className="mx-auto mt-7 max-w-4xl text-3xl font-black leading-tight text-white sm:text-5xl">
            <span className="ken-headline-reveal">{home.title}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            {home.subtitle}
          </motion.p>

          <div className="mx-auto mt-9 flex w-full max-w-sm flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
            <Link
              href="/register"
              className="ken-action-button ken-action-primary inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 shadow-[0_18px_50px_rgba(52,211,153,0.22)] transition hover:bg-emerald-300 sm:w-auto"
            >
              <span>{home.register}</span>
              <ArrowRight className="ken-button-icon" size={16} />
            </Link>
            <Link
              href="/login"
              className="ken-action-button ken-action-ghost inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 sm:w-auto"
            >
              <span>{home.login}</span>
            </Link>
          </div>
        </motion.div>
      </section>

      <motion.button
        type="button"
        onClick={() => {
          document.getElementById("ken-offers")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 1.05, ease: "easeOut" }}
        className="ken-scroll-cue relative z-20 mx-auto -mt-14 mb-4 hidden w-fit cursor-pointer flex-col items-center gap-0 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400 transition md:flex"
      >
        <span>Scroll</span>
        <ArrowDown size={23} strokeWidth={1.8} />
      </motion.button>

      <section id="ken-offers" className="mx-auto w-full max-w-7xl scroll-mt-8 py-14 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-emerald-100">
            <LayoutGrid size={24} />
          </div>
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            {home.offerTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">{home.offerText}</p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {home.stats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.45, delay: index * 0.08 },
              }}
              viewport={{ once: true, amount: 0.45 }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="ken-home-stat ken-stat-card rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
            >
              <div className="text-sm font-black text-white">{item.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl pb-24">
        <div className="space-y-8">
          {home.modules.map((module, index) => {
            const Icon = moduleIcons[index % moduleIcons.length];
            const isRight = index % 2 === 1;

            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 34, scale: 0.94, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                className={["flex", isRight ? "justify-end" : "justify-start"].join(" ")}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={[
                    "ken-feature-card ken-edge-card ken-glass w-full max-w-3xl rounded-3xl p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-6",
                    isRight ? "md:text-right" : "md:text-left",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "flex flex-col gap-5 sm:flex-row sm:items-center",
                      isRight ? "sm:flex-row-reverse" : "",
                    ].join(" ")}
                  >
                    <motion.div
                      whileHover={{ y: -4, scale: 1.08 }}
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 16,
                      }}
                      className={`ken-feature-icon flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br ${accentClasses[index % accentClasses.length]}`}
                    >
                      <Icon size={34} />
                    </motion.div>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                        {module.count}
                      </div>
                      <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                        {module.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                        {module.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="ken-home-stat mx-auto mt-14 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-center shadow-[0_20px_50px_rgba(0,0,0,0.18)] sm:flex-row sm:text-left"
        >
          <div>
            <div className="text-lg font-black text-white">{home.ctaTitle}</div>
          </div>
          <Link
            href="/register"
            className="ken-action-button ken-action-light inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-100 sm:w-auto"
          >
            <span>{home.register}</span>
            <ArrowRight className="ken-button-icon" size={16} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
