import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "KEN",
  description: "KEN keeps tasks, expenses, lists, recipes, trips, movies, and notes in one personal productivity app.",
  icons: {
    icon: "/ken_logo.svg",
    shortcut: "/ken_logo.svg",
    apple: "/ken_logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
