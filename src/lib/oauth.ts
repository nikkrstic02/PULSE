const DEFAULT_APP_PATH = "/dashboard";

export function getAppUrl(req: Request): string {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL;
  const origin = configuredUrl && configuredUrl.trim() ? configuredUrl : new URL(req.url).origin;

  return origin.replace(/\/$/, "");
}

export function getSafeNextPath(value: string | null): string {
  if (!value) return DEFAULT_APP_PATH;

  try {
    const parsed = new URL(value, "http://ken.local");
    if (parsed.origin !== "http://ken.local") return DEFAULT_APP_PATH;

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return DEFAULT_APP_PATH;
  }
}

export function getGoogleSuccessPath(nextPath: string): string {
  const parsed = new URL(getSafeNextPath(nextPath), "http://ken.local");
  parsed.searchParams.set("google", "success");

  return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}
