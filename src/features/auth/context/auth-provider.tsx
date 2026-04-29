"use client";

import { AuthContext } from "./auth-context";
import type { User } from "@/features/auth/api/auth.api";
import { useMeQuery } from "@/features/auth/queries/use-me-query";

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const me = useMeQuery(initialUser);
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
