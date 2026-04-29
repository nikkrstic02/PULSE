import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page Not Found - KEN",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <NotFoundContent />
      </body>
    </html>
  );
}
