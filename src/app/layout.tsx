import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import HeaderNav from "@/components/layout/HeaderNav";
import Footer from "@/components/layout/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";

const inter = Inter({ subsets: ["latin"] });
const garamond = EB_Garamond({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-garamond' 
});

// SEO Enhancement: More descriptive metadata
export const metadata: Metadata = {
  title: "JVR Practice | Dr. Johan Van Rooyen - Orthopedic Surgeon in Nelspruit",
  description: "Dr. Johan Van Rooyen's Orthopedic Practice in Nelspruit, specializing in joint replacement, arthroscopy, and trauma. Providing comprehensive orthopedic care.",
  keywords: "Orthopedic Surgeon, Nelspruit, Dr. Johan Van Rooyen, JVR Practice, knee replacement, hip replacement, shoulder surgery, arthroscopy, trauma surgery, Mediclinic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${garamond.variable}`}>
      <head>
        {/* SEO Enhancement: Add Schema Markup */}
        <SchemaMarkup />
      </head>
      <body className={inter.className}>
        <HeaderNav />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
