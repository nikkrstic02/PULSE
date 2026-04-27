import axios from "axios";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.split("=").slice(1).join("="));
}

export const http = axios.create({
  // Same-origin requests -> handled by Next route handlers.
  baseURL: "",
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

http.interceptors.request.use((config) => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    config.headers = config.headers ?? {};
    config.headers["X-XSRF-TOKEN"] = xsrf;
    config.headers["X-CSRF-TOKEN"] = xsrf;
  }
  return config;
});
