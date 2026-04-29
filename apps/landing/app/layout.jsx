import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Sumbandila | National Verification System",
  description: "Official South African Trust Registry for Institutions and Professionals. Verify education, healthcare, and legal practitioners in real-time.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import SiphoFloatingAssistant from "../components/SiphoFloatingAssistant";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased overflow-x-hidden bg-[#0B1120]">
        {/* Background Glow Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <SiphoFloatingAssistant />
      </body>
    </html>
  );
}
