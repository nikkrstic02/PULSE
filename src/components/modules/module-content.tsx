"use client";

import { useLanguageCopy } from "@/lib/i18n";

export type ModuleKey =
  | "calories"
  | "expenses"
  | "lists"
  | "movies"
  | "recipes"
  | "settings"
  | "todos"
  | "trips";

export function ModuleContent({ moduleKey }: { moduleKey: ModuleKey }) {
  const { copy } = useLanguageCopy();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200 sm:tracking-[0.2em]">
        {copy.modules[moduleKey]}
      </div>
      <h1 className="text-2xl font-black sm:text-3xl">{copy.modules.comingSoon}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
        {copy.modules.description}
      </p>
    </div>
  );
}
