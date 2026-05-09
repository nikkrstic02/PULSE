export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0f1a]/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-center text-xs font-semibold text-slate-400 sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <span>© 2026 Pulse</span>
        <a
          href="mailto:support@pulse.com"
          className="text-cyan-200 transition hover:text-white"
        >
          support@pulse.com
        </a>
      </div>
    </footer>
  );
}
