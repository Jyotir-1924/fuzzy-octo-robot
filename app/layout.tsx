import "./globals.css";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "AI Fitness Coach",
  description: "Your personalized AI-powered fitness and nutrition assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
