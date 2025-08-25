// src/components/SchemaMarkup.tsx
import React from 'react';

const SchemaMarkup = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Johan Van Rooyen",
    "image": "https://www.jvrpractice.com/images/pfp.webp",
    "url": "https://www.jvrpractice.com/",
    "telephone": "+27137457836",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Suite 207, Medical Centre, Mediclinic Nelspruit, 1 Louise St, Sonheuwel",
      "addressLocality": "Mbombela",
      "postalCode": "1201",
      "addressCountry": "ZA"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "16:30"
    },
    "medicalSpecialty": "Orthopedic",
    "description": "Dr. Johan Van Rooyen is an orthopedic surgeon in Nelspruit specializing in joint replacement, arthroscopy, and trauma."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaMarkup;
