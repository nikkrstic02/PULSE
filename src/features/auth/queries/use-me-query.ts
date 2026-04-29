"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe, type User } from "@/features/auth/api/auth.api";
import { authKeys } from "./auth.keys";

export function useMeQuery(initialUser?: User | null) {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getMe,
    initialData: initialUser === undefined ? undefined : initialUser,
    staleTime: 60_000,
  });
}
