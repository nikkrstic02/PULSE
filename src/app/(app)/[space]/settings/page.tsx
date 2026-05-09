import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleContent } from "@/components/modules/module-content";

const VALID_SPACES = ["organize", "lifestyle"] as const;
type Space = (typeof VALID_SPACES)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ space: string }>;
}): Promise<Metadata> {
  const { space } = await params;
  const spaceName = space.charAt(0).toUpperCase() + space.slice(1);
  return { title: `${spaceName} - Settings` };
}

export default async function SpaceSettingsPage({
  params,
}: {
  params: Promise<{ space: string }>;
}) {
  const { space } = await params;

  if (!VALID_SPACES.includes(space as Space)) {
    notFound();
  }

  return <ModuleContent moduleKey="settings" />;
}
