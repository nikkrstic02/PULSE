import { http } from "@/lib/http";

export async function ensureCsrfCookie() {
  await http.get("/sanctum/csrf-cookie");
}
