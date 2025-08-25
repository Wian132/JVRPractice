// File: src/components/layout/CookieConsentBanner.tsx
// Description: A banner to inform users about cookie usage and get their consent.
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

const COOKIE_CONSENT_KEY = 'jvr-practice-cookie-consent';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if consent has already been given
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // If no consent is found, show the banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // When the user accepts, store the consent and the date in local storage
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ accepted: true, date: new Date().toISOString() }));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4"
          role="dialog"
          aria-labelledby="cookie-consent-heading"
          aria-describedby="cookie-consent-description"
        >
          <div className="container mx-auto max-w-4xl p-6 rounded-lg shadow-2xl bg-[#F5F5DC]/95 backdrop-blur-md border-2 border-[#D2B48C]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 id="cookie-consent-heading" className="text-xl font-bold font-serif-display text-[#3a2e20]">Our Use of Cookies</h2>
                <p id="cookie-consent-description" className="text-[#5c4b3a] mt-1">
                  We use essential cookies to make our site work. By using our site, you acknowledge that you have read and understand our{' '}
                  <a href="/privacy-policy" className="underline hover:text-[#8B4513] transition-colors">
                    Privacy Policy
                  </a>.
                </p>
              </div>
              <Button
                onClick={handleAccept}
                className="font-serif bg-[#5C4033] text-white hover:bg-[#8B4513] text-lg font-bold py-4 px-8 rounded-sm border-2 border-[#D2B48C] shadow-lg transition-transform transform hover:scale-105"
                aria-label="Accept and close cookie consent banner"
              >
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
