import { notFound } from "next/navigation";

const modules: Record<string, string> = {
  lists: "Lists",
  todos: "To-Do",
  expenses: "Expenses",
  recipes: "Recipes",
  calories: "Calories",
  trips: "Trips",
  movies: "Movies",
  settings: "Settings",
};

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const title = modules[module];
  if (!title) notFound();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
        {title}
      </div>
      <h1 className="text-3xl font-black">Coming soon</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
        Module shell is ready in Next.js. Next step is implementing real CRUD flows with animations and micro-interactions.
      </p>
    </div>
  );
}
