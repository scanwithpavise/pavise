import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });
import { headers } from "next/headers";
export const metadata: Metadata = {
  title: "PAVISE",
  description: "Pavise first AI-powered Health Diagnostic",
  openGraph: {
    title: "PAVISE - AI Health Diagnostic",
    description:
      "Discover the power of AI-driven health diagnostics with Pavise.",
    url: "https://scanwithpavise.com",
    siteName: "scanwithpavise",
    images: [
      {
        url: "https://pavise-ohayvuk6e-imrybrndos-projects.vercel.app/Images/pavise.jpeg",
        width: 1200,
        height: 630,
        alt: "PAVISE AI Health Diagnostic",
      },
    ],
    type: "website",
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
