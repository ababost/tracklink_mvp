import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AgentProfile from "@/components/agent/AgentProfile";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tracklink MVP",
  description: "Artist management platform with AI assistance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          {children}
          <AgentProfile />
        </main>
      </body>
    </html>
  );
}