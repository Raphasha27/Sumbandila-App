import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sumbandila | Digital Trust Platform',
  description: "Building Africa's digital trust layer through AI-driven fraud detection and Blockchain integrity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="sovereign-bg"></div>
        <div className="glass-container">
          {children}
        </div>
      </body>
    </html>
  );
}
