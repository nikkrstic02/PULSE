import { redirect } from "next/navigation";

const VALID_SPACES = ["organize", "lifestyle"];

export default async function SpaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ space: string }>;
}) {
  const { space } = await params;
  if (!VALID_SPACES.includes(space)) {
    redirect("/organize/dashboard");
  }

  return <>{children}</>;
}
