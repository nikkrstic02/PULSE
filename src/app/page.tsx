import { redirect } from "next/navigation";
import { HomeContent } from "@/components/home/home-content";

export default async function RootPage({
  searchParams,
}: {
  searchParams: Promise<{ google?: string }>;
}) {
  const { google } = await searchParams;
  if (google === "success") {
    redirect("/dashboard?google=success");
  }

  return <HomeContent />;
}
