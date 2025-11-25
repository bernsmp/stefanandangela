import type { Metadata } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthGuard } from "@/components/auth/AuthGuard";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cognitive Fingerprint™ | Stefan & Angela Leadership Dashboard",
  description: "Interactive visualization of cognitive patterns, blind spots, and leadership interface dynamics",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Cognitive Fingerprint™ | Leadership Interface Map',
    description: 'How Stefan & Angela think differently, where they create synergy, and the protocols that multiply their effectiveness.',
    url: 'https://dashboard-tau-mauve-75.vercel.app',
    siteName: 'Cognitive Fingerprint™',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cognitive Fingerprint - Stefan & Angela Leadership Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cognitive Fingerprint™ | Leadership Interface Map',
    description: 'How Stefan & Angela think differently, where they create synergy, and the protocols that multiply their effectiveness.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased bg-white`}
        style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}
      >
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
