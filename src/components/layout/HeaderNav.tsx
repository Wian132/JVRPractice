"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  // UX Enhancement: Smooth scroll handler
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.replace(/.*#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: 'smooth',
    });
    // Close mobile menu on click
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Find Us', href: '#map-location' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Specialities', href: '#specialities' },
    { name: 'About', href: '#about' },
  ];

  const bgColor = 'bg-[#F5F5DC]/90';
  const textColor = 'text-[#5C4033]';
  const hoverColor = 'hover:text-[#8B4513]';

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 font-serif ${bgColor} backdrop-blur-sm shadow-md border-b-2 border-[#D2B48C]/50`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          <Link href="/" className="flex items-center gap-2" onClick={(e) => handleScroll(e, '/')}>
            <Image
              src="/logos/logo1.png"
              alt="JVR Practice Logo"
              width={64}
              height={64}
              className="h-16 w-16"
            />
            <span className={`text-4xl lg:text-5xl ${textColor}`}>
              Dr. <span className="font-bold">Johan</span> Van Rooyen
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleScroll(e, link.href)}
                className={`relative group ${textColor} ${hoverColor} transition-colors text-2xl`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B4513] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" aria-expanded={isOpen}>
              {isOpen ? <X className={`h-8 w-8 ${textColor}`} /> : <Menu className={`h-8 w-8 ${textColor}`} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.nav 
          className={`md:hidden ${bgColor} px-4 pt-2 pb-4 space-y-2`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleScroll(e, link.href)} className={`block py-3 text-2xl ${textColor} ${hoverColor}`}>
                {link.name}
            </a>
          ))}
        </motion.nav>
      )}
    </header>
  );
};

export default HeaderNav;
