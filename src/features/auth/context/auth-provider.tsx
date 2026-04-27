"use client";

import { AuthContext } from "./auth-context";
import { useMeQuery } from "@/features/auth/queries/use-me-query";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const me = useMeQuery();
  const user = me.data ?? null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: me.isLoading,
        refetchMe: () => {
          void me.refetch();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
