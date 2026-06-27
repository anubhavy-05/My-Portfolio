import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import Navbar, { NAVBAR_HEIGHT } from "@/components/Navbar";
import Footer from "@/components/Footer"; 
// 1. Naya Context Import kiya
import { ModeProvider } from "@/context/ModeContext"; 

const bodyFont = Inter({ subsets: ["latin"] });
const monoFont = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anubhav Yadav | Full Stack Developer",
  description: "A premium portfolio for Anubhav Yadav, built with Next.js, Tailwind CSS, and Framer Motion." 
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.className} ${monoFont.className}`}>
      <body className="antialiased flex flex-col min-h-screen bg-background text-text">
        {/* 2. Puri app ko ModeProvider ke andar daal diya */}
        <ModeProvider>
          <Navbar />
          <main className="flex-grow font-sans" style={{ paddingTop: NAVBAR_HEIGHT }}>
            {children}
          </main>
          <Footer />
        </ModeProvider>
      </body>
    </html>
  );
}