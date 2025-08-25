// ===============================
// src/components/AnatomyInfoCard.tsx
// (updated to use next/image)
// ===============================
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { AnatomyPart } from "../data/anatomyData";
import Image from "next/image"; // FIX: Import the Next.js Image component

export type AnatomyInfoCardProps = {
  speciality: AnatomyPart;
  isActive?: boolean;
  onActivate?: () => void;
  onClose?: () => void;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function AnatomyInfoCard({ speciality, isActive = true, onActivate }: AnatomyInfoCardProps) {
  if (!speciality) return null;

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`relative rounded-sm border border-[#8a7a69] shadow-2xl bg-cover bg-center overflow-hidden ${
        isActive ? "p-4 md:p-6" : "p-2"
      }`}
      style={{
        backgroundImage: "url('/images/parchment-bg.webp')",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(245,245,220,0.85)",
        backdropFilter: "blur(4px)",
      }}
      onClick={() => { if (!isActive) onActivate?.(); }}
      role={!isActive ? "button" : undefined}
      tabIndex={!isActive ? 0 : -1}
      onKeyDown={(e) => { if (!isActive && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onActivate?.(); } }}
    >
      <div className="flex items-center gap-3 md:gap-4">
        <motion.div
          variants={itemVariants}
          // FIX: Added 'relative' for the Image component's 'fill' prop
          className={`relative border-2 border-[#8a7a69] p-0.5 bg-[#f0e8d9] shrink-0 ${
            isActive ? "w-28 h-28 md:w-48 md:h-48" : "w-14 h-14 md:w-18 md:h-18"
          }`}
        >
          {/* FIX: Replaced <img> with next/image <Image> for optimization */}
          <Image 
            src={speciality.image} 
            alt={`${speciality.title} illustration`} 
            fill
            sizes="(max-width: 768px) 112px, 192px"
            className={`object-cover ${isActive ? "sepia-[.5]" : "sepia"}`} 
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.h4
            variants={itemVariants}
            className={`font-serif-display text-[#3a2e20] truncate ${
              isActive ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
            }`}
            title={speciality.title}
          >
            {speciality.title}
          </motion.h4>

          {isActive ? (
            <motion.p variants={itemVariants} className="mt-1 md:mt-2 text-sm md:text-base text-[#5c4b3a]">
              {speciality.description}
            </motion.p>
          ) : (
            <motion.p variants={itemVariants} className="text-sm md:text-base text-[#5c4b3a]/80 line-clamp-1">
              Tap to view more
            </motion.p>
          )}
        </div>
      </div>

      {!isActive && <div className="absolute inset-0 backdrop-blur-[1.5px] opacity-70 bg-[#f5f5dc]/40 pointer-events-none" />}
    </motion.div>
  );
}
