// File: src/components/layout/Footer.tsx (Corrected)
// Description: Replaced anchor tags with Next.js Link components for internal navigation.
"use client";

import React from 'react';
import Link from 'next/link'; // Import the Link component

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#5C4033] text-[#F5F5DC] font-serif">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center text-center space-y-4">
          
          <div className="flex gap-x-4">
            <Link href="/" className="underline hover:text-[#D2B48C] transition-colors">Home</Link>
            <Link href="/privacy-policy" className="underline hover:text-[#D2B48C] transition-colors">Privacy Policy</Link>
          </div>

          {/* Copyright */}
          <p className="text-lg">&copy; {currentYear} Dr. Johan Van Rooyen</p>
          
          {/* Developer Credit */}
          <div className="text-sm flex flex-col sm:flex-row sm:gap-x-2">
            <span>Website by: Wian Otto</span>
            <a href="mailto:wianotto@gmail.com" className="underline hover:text-[#D2B48C] transition-colors">wianotto@gmail.com</a>
            <a href="tel:0814703105" className="underline hover:text-[#D2B48C] transition-colors">0814703105</a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
