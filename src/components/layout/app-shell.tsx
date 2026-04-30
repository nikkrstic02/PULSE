"use client";

import { useState } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import type { User } from "@/features/auth/api/auth.api";
import { useAuth } from "@/features/auth/context/auth-context";
import { AuthProvider } from "@/features/auth/context/auth-provider";

function AppShellContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen animate-pulse bg-[#070a10]" />;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <Sidebar
          mobile
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col bg-[var(--app)]/70">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function AppShell({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User;
}) {
  return (
    <AuthProvider initialUser={initialUser}>
      <AppShellContent>{children}</AppShellContent>
    </AuthProvider>
  );
}
