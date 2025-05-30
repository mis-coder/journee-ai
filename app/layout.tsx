import type { Metadata } from "next";
import { Oregano, Plus_Jakarta_Sans, Spline_Sans } from "next/font/google";
import "./globals.css";

const splineSans = Spline_Sans({
  variable: "--font-spline-sans",
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
        className={`${splineSans.variable} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
