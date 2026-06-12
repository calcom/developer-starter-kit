import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import localFont from "next/font/local";

import { LayoutCustomizer } from "@/components/layout-customizer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider, ThemeScript } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getBrandName } from "@/lib/cal-api/env";

import "./globals.css";

const calSans = localFont({
  src: "../fonts/CalSansUI[wght,GEOM].woff2",
  variable: "--font-cal",
  weight: "400 700",
  display: "swap",
});

const calSansHeading = localFont({
  src: "../fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal-heading",
  weight: "600",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: getBrandName(),
  description: "Schedule a time that works for everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${calSans.variable} ${calSansHeading.variable} ${inter.variable} ${geist.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <LayoutCustomizer />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
