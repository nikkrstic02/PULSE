"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/features/auth/api/auth.api";
import { authKeys } from "./auth.keys";

export function useMeQuery() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getMe,
    staleTime: 60_000,
  });
}
