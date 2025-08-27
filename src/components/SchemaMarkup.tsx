// src/components/SchemaMarkup.tsx
// Description: Enhanced schema to include both Physician and MedicalBusiness types in a graph.

import React from 'react';

const SchemaMarkup = () => {
  // SEO Change: Using a @graph to connect multiple schema types (Physician and MedicalBusiness).
  // This creates a richer data structure for search engines.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "name": "Dr. Johan Van Rooyen",
        "image": "https://www.jvrpractice.com/images/pfp.webp",
        "url": "https://www.jvrpractice.com/",
        "telephone": "+27137457836",
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
      },
      {
        "@type": "MedicalBusiness",
        "@id": "https://www.jvrpractice.com/#organization",
        "name": "Dr. Johan Van Rooyen's Practice",
        "url": "https://www.jvrpractice.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Suite 207, Medical Centre, Mediclinic Nelspruit, 1 Louise St, Sonheuwel",
          "addressLocality": "Mbombela",
          "postalCode": "1201",
          "addressCountry": "ZA"
        },
        "telephone": "+27137457836",
        // SEO Change: Added hasMap property to link to the Google Maps listing.
        "hasMap": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.344666792661!2d30.95931917510759!3d-25.493549235408647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee84b23115c0ad9%3A0x1d4ff4e2a0904a58!2sMediclinic%20Nelspruit%20Hospital%20%26%20Day%20Clinic!5e0!3m2!1saf!2sza!4v1756128825524!5m2!1saf!2sza"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaMarkup;
