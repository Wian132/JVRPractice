"use client";

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#5C4033] text-[#F5F5DC] font-serif">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center text-center space-y-2">
          
          {/* Copyright */}
          <p className="text-lg">&copy; {currentYear} Dr. Johan Van Rooyen</p>
          
          {/* === FIX: Updated Developer Credit with specific details === */}
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
