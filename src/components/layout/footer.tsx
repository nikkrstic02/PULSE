export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0f1a]/80">
      <div className="mx-auto flex w-full max-w-7xl justify-between px-6 py-4 text-xs font-semibold text-slate-400">
        <span>© 2026 KEN</span>
        <a
          href="mailto:support@ken.app"
          className="text-cyan-200 transition hover:text-white"
        >
          support@ken.app
        </a>
      </div>
    </footer>
  );
}
