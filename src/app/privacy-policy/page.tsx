// File: src/app/privacy-policy/page.tsx
// Description: Updated the page title for better branding.

import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  // SEO Change: Made the title more descriptive.
  title: "Privacy Policy | Dr. Johan Van Rooyen Orthopaedic Practice",
  description: "Privacy Policy for the medical practice of Dr. Johan Van Rooyen, Orthopedic Surgeon in Nelspruit.",
  robots: "noindex, follow", // Good practice to noindex privacy policies
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-cover bg-center" style={{ backgroundImage: `url('/background/paper_texture.jpg')` }}>
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto bg-[#F5F5DC]/80 backdrop-blur-sm p-8 md:p-12 border-2 border-[#D2B48C] rounded-sm shadow-2xl text-[#3a2e20]">
          <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-6 text-center">Privacy Policy</h1>
          
          <p className="mb-4"><strong>Last Updated:</strong> 25 August 2025</p>

          <p className="mb-6">
            Dr. Johan Van Rooyen&apos;s practice (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, jvrpractice.com (the &quot;Site&quot;). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>

          <h2 className="font-serif-display text-2xl md:text-3xl font-bold mt-8 mb-4">Collection of Your Information</h2>
          <p className="mb-4">
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you use the contact form on the Site. You are under no obligation to provide us with personal information of any kind; however, your refusal to do so may prevent you from using certain features of the Site.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
            </li>
          </ul>

          <h2 className="font-serif-display text-2xl md:text-3xl font-bold mt-8 mb-4">Use of Your Information</h2>
          <p className="mb-6">
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Respond to your requests for an appointment or other inquiries.</li>
            <li>Email you regarding your inquiry.</li>
            <li>Increase the efficiency and operation of the Site.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          </ul>

          <h2 className="font-serif-display text-2xl md:text-3xl font-bold mt-8 mb-4">Disclosure of Your Information</h2>
          <p className="mb-6">
            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information. This does not include trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others&apos; rights, property, or safety.
          </p>

          <h2 className="font-serif-display text-2xl md:text-3xl font-bold mt-8 mb-4">Security of Your Information</h2>
          <p className="mb-6">
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any any interception or other type of misuse.
          </p>

          <h2 className="font-serif-display text-2xl md:text-3xl font-bold mt-8 mb-4">Policy for Children</h2>
          <p className="mb-6">
            We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
          </p>
          
          <h2 className="font-serif-display text-2xl md:text-3xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
            <br />
            <strong>Dr. Johan Van Rooyen Practice</strong>
            <br />
            Suite 207, Medical Centre, Mediclinic Nelspruit
            <br />
            Mbombela, 1201
            <br />
            <a href="tel:0137457836" className="text-blue-700 hover:underline">013 745 7836</a>
            <br />
            <a href="mailto:jvrpractice@gmail.com" className="text-blue-700 hover:underline">jvrpractice@gmail.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
