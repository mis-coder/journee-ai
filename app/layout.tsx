import Header from "@/components/ui/header";
import type { Metadata } from "next";
import { Oregano, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const oregano = Oregano({
  variable: "--font-oregano",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jounee AI",
  description:
    "Journee makes travel planning easy and personalized. Just share your travel preferences, and get a ready-to-go itinerary with places to visit, stay options, and budget tips—all in one simple app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${oregano.variable} antialiased`}
      >
        <Header />
        <main className="pt-[100px]">{children}</main>
      </body>
    </html>
  );
}
