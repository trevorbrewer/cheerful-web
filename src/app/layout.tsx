import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Suspense } from "react";
import PostHogProvider from "@/components/analytics/PostHogProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cheerful — Make Life Full",
  description: "Round-up giving for the causes you love. Link your card and donate spare change to a nonprofit of your choice — automatically, every month.",
  keywords: ["charity", "giving", "donate", "round-up", "nonprofit", "spare change"],
  openGraph: {
    title: "Cheerful — Make Life Full",
    description: "Round-up giving for the causes you love.",
    type: "website",
    locale: "en_US",
    siteName: "Cheerful",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheerful — Make Life Full",
    description: "Round-up giving for the causes you love.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} font-body bg-brand-cream text-brand-charcoal`}>
        <Suspense>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}