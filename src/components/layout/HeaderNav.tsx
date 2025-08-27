"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Find Us', href: '#map-location' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Specialities', href: '#specialities' },
    { name: 'About', href: '#about' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  const textColor = 'text-[#5C4033]';
  const hoverColor = 'hover:text-[#8B4513]';

  // This function determines the correct link destination and behavior
  const renderLink = (link: { name: string, href: string }, isMobile = false) => {
    const isHomePage = pathname === '/';
    const isPageLink = link.href.startsWith('/');
    const isHashLink = link.href.startsWith('#');

    const mobileClasses = `block py-3 text-2xl ${textColor} ${hoverColor}`;
    const desktopClasses = `relative group ${textColor} ${hoverColor} transition-colors text-2xl`;
    const currentClasses = isMobile ? mobileClasses : desktopClasses;

    // For internal page links like /privacy-policy
    if (isPageLink) {
      return (
        <Link href={link.href} passHref>
          <span onClick={() => isOpen && setIsOpen(false)} className={currentClasses}>
            {link.name}
            {!isMobile && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B4513] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>}
          </span>
        </Link>
      );
    }
    
    // For hash links like #contact
    if (isHashLink) {
        // If we are on the homepage, use a standard <a> tag.
        // The browser will handle the scrolling, and our CSS will handle the offset.
        if (isHomePage) {
            return (
                <a 
                    href={link.href} 
                    onClick={() => isOpen && setIsOpen(false)} // Just close the menu on click
                    className={currentClasses}
                >
                    {link.name}
                    {!isMobile && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B4513] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>}
                </a>
            );
        }
        // If we are NOT on the homepage, create a link that goes back to the homepage first
        return (
            <Link href={`/${link.href}`} passHref>
                <span onClick={() => isOpen && setIsOpen(false)} className={currentClasses}>
                    {link.name}
                    {!isMobile && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B4513] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>}
                </span>
            </Link>
        );
    }

    // Fallback for any other type of link
    return (
      <a href={link.href} className={currentClasses}>
        {link.name}
        {!isMobile && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B4513] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>}
      </a>
    );
  };

  return (
    <header 
      // The ID is no longer needed for the scroll handler
      className={`sticky top-0 z-50 w-full font-serif shadow-md border-b-2 border-[#D2B48C]/50 bg-cover bg-center`}
      style={{ backgroundImage: "url('/background/paper_texture.jpg')" }}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between md:justify-end h-28">
          
          {/* Removed the complex onClick handler */}
          <Link href="/" className="md:absolute md:left-[35%] md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <span className={`text-3xl md:text-4xl lg:text-5xl ${textColor} text-center`}>
              Dr. <span className="font-bold">Johan</span> Van Rooyen
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                {renderLink(link)}
              </React.Fragment>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" aria-expanded={isOpen}>
              {isOpen ? <X className={`h-8 w-8 ${textColor}`} /> : <Menu className={`h-8 w-8 ${textColor}`} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.nav 
          className={`md:hidden px-4 pt-2 pb-4 space-y-2 bg-cover bg-center border-t-2 border-[#D2B48C]/50`}
          style={{ backgroundImage: "url('/background/paper_texture.jpg')" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {navLinks.map((link) => (
             <React.Fragment key={link.name}>
                {renderLink(link, true)}
            </React.Fragment>
          ))}
        </motion.nav>
      )}
    </header>
  );
};

export default HeaderNav;
