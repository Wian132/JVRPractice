// File: src/app/layout.tsx (Updated)
// Description: Added a specific Open Graph image and comprehensive favicon links.

import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import HeaderNav from "@/components/layout/HeaderNav";
import Footer from "@/components/layout/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import CookieConsentBanner from "@/components/layout/CookieConsentBanner";

const inter = Inter({ subsets: ["latin"] });
const garamond = EB_Garamond({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-garamond' 
});

export const metadata: Metadata = {
  title: "Dr. Johan Van Rooyen | Orthopedic Surgeon in Nelspruit",
  description: "Dr. Johan Van Rooyen's Orthopedic Practice in Nelspruit, specializing in joint replacement, arthroscopy, and trauma. Providing comprehensive orthopedic care.",
  keywords: "Orthopedic Surgeon, Nelspruit, Dr. Johan Van Rooyen, JVR Practice, knee replacement, hip replacement, shoulder surgery, arthroscopy, trauma surgery, Mediclinic",
  // SEO Fix: Added Open Graph metadata to control the image that appears in search results and social shares.
  openGraph: {
    title: "Dr. Johan Van Rooyen | Orthopedic Surgeon in Nelspruit",
    description: "Specializing in joint replacement, arthroscopy, and trauma care in Nelspruit.",
    url: "https://www.jvrpractice.com",
    siteName: "JVR Practice",
    // This line tells Google and social media to use the doctor's picture.
    images: [
      {
        url: "https://www.jvrpractice.com/images/pfp.webp",
        width: 250,
        height: 350,
        alt: "Dr. Johan Van Rooyen, Orthopedic Surgeon",
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${garamond.variable}`}>
      <head>
        <SchemaMarkup />
        {/* Favicon Fix: Added a complete set of favicon links for cross-browser consistency. */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <HeaderNav />
        {children}
        <Footer />
        <Toaster />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
