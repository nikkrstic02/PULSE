import { notFound } from "next/navigation";
import { ModuleContent, type ModuleKey } from "@/components/modules/module-content";

const modules: ModuleKey[] = [
  "lists",
  "todos",
  "expenses",
  "recipes",
  "calories",
  "trips",
  "movies",
  "settings",
];

export const dynamicParams = false;

export function generateStaticParams() {
  return modules.map((module) => ({ module }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  if (!modules.includes(module as ModuleKey)) notFound();

  return <ModuleContent moduleKey={module as ModuleKey} />;
}
