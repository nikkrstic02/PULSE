"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginPayload } from "@/features/auth/api/auth.api";
import { login } from "@/features/auth/api/auth.api";
import { authKeys } from "./auth.keys";

export function useLoginMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (user) => {
      qc.setQueryData(authKeys.me(), user);
    },
  });
}
