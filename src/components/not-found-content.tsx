"use client";

import Link from "next/link";
import { useLanguageCopy } from "@/lib/i18n";

export function NotFoundContent() {
  const { copy } = useLanguageCopy();

  return (
    <main className="grid min-h-screen place-items-center px-6 py-12">
      <section className="w-full max-w-5xl text-center">
        <div className="ken-wordmark text-3xl sm:text-4xl">KEN</div>
        <p className="mt-12 text-3xl font-black tracking-[0.32em] text-cyan-200 sm:text-5xl">
          404
        </p>
        <h1 className="mt-7 text-6xl font-black tracking-tight text-white sm:text-8xl">
          {copy.notFound.title}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-slate-300 sm:text-2xl">
          {copy.notFound.description}
        </p>
        <Link
          href="/dashboard"
          className="mt-12 inline-flex rounded-2xl bg-[#6b6ee6] px-8 py-5 text-lg font-bold text-white transition hover:brightness-110"
        >
          {copy.notFound.back}
        </Link>
      </section>
    </main>
  );
}
