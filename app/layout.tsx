import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import Navbar, { NAVBAR_HEIGHT } from "@/components/Navbar";

const bodyFont = Inter({ subsets: ["latin"] });
const monoFont = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anubhav Yadav | Full Stack Developer",
  description: "A premium Rose Carbon portfolio for Anubhav Yadav, built with Next.js 14, Tailwind CSS, and Framer Motion."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.className} ${monoFont.className}`}>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen bg-background text-text font-sans" style={{ paddingTop: NAVBAR_HEIGHT }}>
          {children}
        </main>
      </body>
    </html>
  );
}