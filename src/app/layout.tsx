import type { Metadata } from "next";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getBrandName } from "@/lib/cal-api/env";

import "./globals.css";

const calSans = localFont({
  src: "../fonts/CalSansUI[wght,GEOM].woff2",
  variable: "--font-sans",
  weight: "400 700",
  display: "swap",
});

const calSansHeading = localFont({
  src: "../fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
  weight: "600",
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
      className={`${calSans.variable} ${calSansHeading.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
