import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "PULSE",
    template: "PULSE - %s",
  },
  description: "Pulse keeps tasks, expenses, lists, recipes, trips, movies, and notes in one personal productivity app.",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual'}window.scrollTo(0,0)`,
          }}
        />
      </head>
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
