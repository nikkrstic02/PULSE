import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h1 className="text-3xl font-black">Page not found</h1>
        <p className="mt-2 text-sm text-slate-300">The page you requested does not exist.</p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
