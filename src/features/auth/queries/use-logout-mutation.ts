"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/features/auth/api/auth.api";
import { authKeys } from "./auth.keys";

export function useLogoutMutation(onLoggedOut?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      qc.setQueryData(authKeys.me(), null);
      await qc.invalidateQueries({ queryKey: authKeys.me() });
      onLoggedOut?.();
    },
  });
}
