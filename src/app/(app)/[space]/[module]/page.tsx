import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleContent, type ModuleKey } from "@/components/modules/module-content";

const ORGANIZE_MODULES: ModuleKey[] = ["lists", "todos", "expenses"];
const LIFESTYLE_MODULES: ModuleKey[] = ["recipes", "calories", "trips", "movies"];
const ALL_MODULES: ModuleKey[] = [...ORGANIZE_MODULES, ...LIFESTYLE_MODULES];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module } = await params;
  const title = module.charAt(0).toUpperCase() + module.slice(1);
  return { title };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ space: string; module: string }>;
}) {
  const { space, module } = await params;

  if (!ALL_MODULES.includes(module as ModuleKey)) notFound();

  // Validate module belongs to the correct space
  if (space === "organize" && !ORGANIZE_MODULES.includes(module as ModuleKey)) notFound();
  if (space === "lifestyle" && !LIFESTYLE_MODULES.includes(module as ModuleKey)) notFound();

  return <ModuleContent moduleKey={module as ModuleKey} />;
}
