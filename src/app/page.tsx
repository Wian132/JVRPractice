// File: app/page.tsx (Corrected)
// Description: The main page, with highlighted specialities in the 'About' section.
"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SpecialitiesSection from '@/components/SpecialitiesSection';
import Link from 'next/link';
import { Phone, Stethoscope } from 'lucide-react';

const testimonialsData = [
    { name: "Skim", image: "https://picsum.photos/id/111/100/100", text: "After a highly successful knee replacement in '23 and the repair of a shattered left wrist, now short... to the helpful practice ladies and Dr. Van Rooyen, you are... \"Simply the Best!\"" },
    { name: "Peter Esquino", image: "https://picsum.photos/id/112/100/100", text: "I had a total knee replacement on the 1st of July 2024 and 6 weeks later walking without any aid, From the receptionist to the Physio Therapist to the amazing Dr Johan van Rooyen!" },
    { name: "Crisma van Jaarsveld", image: "https://picsum.photos/id/113/100/100", text: "He saved my mom's leg, great Dr, funny and caring, makes you feel at home." }
];

// Animation variants
const sectionVariants: Variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, };
const testimonialVariants: Variants = { hiddenLeft: { opacity: 0, x: -100 }, hiddenBottom: { opacity: 0, y: 100 }, hiddenRight: { opacity: 0, x: 100 }, visible: (index: number) => ({ opacity: 1, x: 0, y: 0, transition: { duration: 0.4, delay: index * 0.1, ease: "easeOut" } }), };


export default function Home() {
  const [summary] = React.useState<string | null>(`Patients consistently praise Dr. Van Rooyen for being an excellent, skilled, and compassionate orthopedic surgeon who takes time to listen and explain treatment options. His extensive experience and commitment to patient care are highly respected.`);
  const [isClient, setIsClient] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState('');
  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', reason: '', });
  const [formErrors, setFormErrors] = React.useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  React.useEffect(() => {
    setIsClient(true);

    setCurrentTime(new Date().toLocaleTimeString('en-ZA', {
        timeZone: 'Africa/Johannesburg', hour: '2-digit', minute: '2-digit'
    }));
  }, []);

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "jvrpractice@gmail.com";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (formErrors[name as keyof typeof formErrors]) {
        setFormErrors(prev => ({ ...prev, [name]: '' }));
      }
  };

  const validateForm = () => {
    const errors = { name: '', email: '', phone: '' };
    let isValid = true;
    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid.';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const response = await fetch('/api/appointment-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (response.ok) {
          setSubmitStatus({ message: result.message || 'Request sent successfully!', type: 'success' });
          setFormData({ name: '', email: '', phone: '', reason: '' });
        } else {
          setSubmitStatus({ message: result.message || 'An error occurred. Please try again.', type: 'error' });
        }
      } catch {
        setSubmitStatus({ message: 'An unexpected network error occurred.', type: 'error' });
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-fixed md:bg-center"
        style={{ backgroundImage: `url('/images/nature/sunset.webp')`, backgroundPosition: '75% 50%' }}
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4">
            <Image
              src="/images/pfp.webp"
              alt="Professional headshot of Dr. Johan Van Rooyen, Orthopedic Surgeon in Nelspruit"
              width={250}
              height={350}
              className="rounded-lg object-cover border-4 border-white shadow-lg"
              priority
             />
          </div>
          <h1 id="hero-heading" className="mt-8 text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4">JVR Practice</h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200">MBChB (Pret) | MMed Orth (Pret) | FC Orth (SA)</p>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mt-2 mb-12">Years of dedication in restoring mobility</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              <Link href="#contact" passHref>
                <Button
                    className="font-serif bg-[#F5F5DC] text-[#5C4033] hover:bg-[#EAE0C8] text-2xl font-bold py-8 px-16 rounded-sm border-2 border-[#D2B48C] shadow-lg transition-transform transform hover:scale-105"
                    aria-label="Contact Us"
                >
                  <Phone className="mr-3 h-8 w-8" />
                  Contact Us
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
               <Link href="#specialities" passHref>
                <Button
                  className="font-serif bg-[#F5F5DC] text-[#5C4033] hover:bg-[#EAE0C8] text-2xl font-bold py-8 px-16 rounded-sm border-2 border-[#D2B48C] shadow-lg transition-transform transform hover:scale-105"
                  aria-label="View Our Specialities"
                >
                  <Stethoscope className="mr-3 h-8 w-8" />
                  Our Specialities
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Map Section */}
      <section
        id="map-location"
        aria-labelledby="map-heading"
        className="py-16 md:py-20 bg-cover bg-center bg-slow-zoom"
        style={{ backgroundImage: `url('/background/paper_texture.jpg')` }}
      >
         <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-[#F5F5DC]/80 backdrop-blur-sm p-8 md:p-12 border-2 border-[#D2B48C] rounded-sm shadow-2xl">
              <div className="text-center text-[#5C4033]">
                <div className="w-24 h-px bg-[#D2B48C] mx-auto mb-4"></div>
                <h2 id="map-heading" className="font-serif text-4xl md:text-5xl font-bold mb-4">Find Us</h2>
                <div className="w-24 h-px bg-[#D2B48C] mx-auto mb-8"></div>
                <p className="text-lg mb-10">
                    When you enter the Mediclinic gate, the first building on your left on the 2nd floor is where my practice is located. <br/>
                    Suite 207, Medical Centre, Mediclinic Nelspruit, 1 Louise St, Sonheuwel, Mbombela, 1201.
                </p>
              </div>
              <motion.div
                  className="w-full rounded-lg overflow-hidden shadow-xl border border-[#D2B48C]"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
              >
              {isClient && (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.344666792661!2d30.95931917510759!3d-25.493549235408647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee84b23115c0ad9%3A0x1d4ff4e2a0904a58!2sMediclinic%20Nelspruit%20Hospital%20%26%20Day%20Clinic!5e0!3m2!1saf!2sza!4v1756128825524!5m2!1saf!2sza"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Practice Location Map - Mediclinic Nelspruit"
                  ></iframe>
                )}
              {!isClient && <div className="w-full h-[450px] bg-gray-300 flex items-center justify-center"><p>Loading map...</p></div>}
              </motion.div>
            </div>
        </div>
      </section>

      {/* Contact Us Section */}
       <section id="contact" aria-labelledby="contact-heading" className="py-16 md:py-20 bg-cover bg-fixed relative overflow-hidden md:bg-center"
       style={{ backgroundImage: `url('/images/nature/lions.webp')`, backgroundPosition: '75% 50%' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-semibold text-center mb-10 md:mb-12 text-white">Contact Us</h2>
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

            <motion.div className="w-full lg:w-1/2 max-w-lg" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card className="bg-[#F5F5DC]/90 backdrop-blur-sm shadow-xl h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Contact Information</CardTitle>
                  <CardDescription className="text-gray-600">Reach out for appointments or inquiries.</CardDescription>
                </CardHeader>
                <CardContent className="text-gray-700 space-y-3">
                  <p><strong>Address:</strong><br /> Suite 207, Medical Centre,<br /> Mediclinic Nelspruit,<br /> 1 Louise St, Sonheuwel,<br /> Mbombela, 1201</p>
                  <p><strong>Phone:</strong> <a href="tel:0137457836" className="text-blue-600 hover:underline">013 745 7836</a></p>
                  <p><strong>Email:</strong> <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:underline">{contactEmail}</a></p>
                  <p><strong>Hours:</strong></p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Monday - Friday: 8:00 AM – 4:30 PM</li>
                    <li>Saturday & Sunday: Closed</li>
                    <li>
                      <small><i>
                        Hours may vary on public holidays.
                        {isClient && currentTime && ` Current time in SA: ${currentTime}`}
                      </i></small>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div className="w-full lg:w-1/2 max-w-lg" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="bg-[#F5F5DC]/90 backdrop-blur-sm shadow-xl h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Request an Appointment</CardTitle>
                  <CardDescription className="text-gray-600">Fill out the form below. We aim to respond within 1 business day.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="flex flex-col gap-4" onSubmit={handleFormSubmit} noValidate>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <Input id="name" type="text" name="name" placeholder="John Doe" required className="bg-white/80 border-gray-400 text-black placeholder:text-black/70" value={formData.name} onChange={handleInputChange} disabled={isSubmitting} aria-required="true" aria-invalid={!!formErrors.name} />
                      {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                      <Input id="email" type="email" name="email" placeholder="you@example.com" required className="bg-white/80 border-gray-400 text-black placeholder:text-black/70" value={formData.email} onChange={handleInputChange} disabled={isSubmitting} aria-required="true" aria-invalid={!!formErrors.email} />
                      {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Your Phone Number</label>
                      <Input id="phone" type="tel" name="phone" placeholder="082 123 4567" required className="bg-white/80 border-gray-400 text-black placeholder:text-black/70" value={formData.phone} onChange={handleInputChange} disabled={isSubmitting} aria-required="true" aria-invalid={!!formErrors.phone} />
                      {formErrors.phone && <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Brief reason for appointment <span className="text-gray-500">(optional)</span></label>
                      <Textarea id="reason" name="reason" placeholder="e.g., Knee pain, follow-up consultation..." className="bg-white/80 border-gray-400 text-black placeholder:text-black/70" value={formData.reason} onChange={handleInputChange} disabled={isSubmitting} rows={4} />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      aria-live="polite"
                      className="bg-white/90 text-black hover:bg-white shadow-md border border-gray-400 mt-2"
                    >
                      {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                    </Button>
                    {submitStatus && (
                      <p role="alert" className={`mt-2 text-sm font-medium ${submitStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                        {submitStatus.message}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
       </section>

      <SpecialitiesSection />

      <motion.section
        id="about"
        aria-labelledby="about-heading"
        className="relative py-16 md:py-20 bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: `url('/images/nature/waterval.webp')` }}
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
         <div className="container mx-auto px-4 relative z-10">
          <h2 id="about-heading" className="text-3xl md:text-4xl font-semibold text-center mb-10 md:mb-12 text-white">About The Practice & Patient Experiences</h2>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

            <Card className="bg-[#F5F5DC]/90 backdrop-blur-sm shadow-xl h-full flex flex-col">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">General Orthopedic Surgeon</CardTitle>
                <CardDescription className="text-gray-700">Dedicated to providing exceptional orthopedic care in Nelspruit.</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-gray-800 flex-grow flex flex-col items-center justify-center p-6">
                <h4 className="text-xl font-semibold text-[#5C4033] mb-4 font-serif">Specializing In:</h4>
                <ul className="space-y-2 text-lg">
                    <li>Joint Replacement</li>
                    <li>Shoulder Arthroscopy</li>
                    <li>Limb and Trauma Reconstruction</li>
                    <li>Ankle and Lower Limb Pathology</li>
                </ul>
                <p className="mt-6 text-base">Surgeries performed at Nelspruit Mediclinic and Lowveld Busamed hospitals.</p>
              </CardContent>
            </Card>

            {summary && (
                <Card className="bg-[#F5F5DC]/90 backdrop-blur-sm shadow-xl h-full flex flex-col">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-gray-900">What Patients Say</CardTitle>
                        <CardDescription className="text-gray-700">A summary of patient feedback.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-gray-800 italic text-lg flex-grow flex items-center justify-center">
                        <p>{summary}</p>
                    </CardContent>
                </Card>
            )}
           </div>

           <h3 id="testimonials" className="text-3xl md:text-4xl font-semibold text-center mt-16 mb-10 md:mb-12 text-white">Patient Testimonials</h3>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {testimonialsData.map((testimonial, index) => (
               <motion.div
                   key={testimonial.name}
                   variants={testimonialVariants}
                   initial={index === 0 ? "hiddenLeft" : index === 1 ? "hiddenBottom" : "hiddenRight"}
                   whileInView="visible"
                   viewport={{ once: true, amount: 0.3 }}
                   custom={index}
                   className="transition-transform transform hover:scale-105"
               >
                 <Card className="bg-[#F5F5DC]/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col">
                   <CardHeader className="flex flex-row items-center gap-4 p-6">
                     <Avatar>
                       <AvatarImage src={testimonial.image} alt={`Avatar of ${testimonial.name}`} />
                       <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                     </Avatar>
                     <CardTitle className="text-2xl text-gray-900">{testimonial.name}</CardTitle>
                   </CardHeader>
                   <CardContent className="flex-grow p-6 pt-0">
                     <blockquote className="text-gray-700 italic text-lg">
                        <p>{testimonial.text}</p>
                     </blockquote>
                   </CardContent>
                 </Card>
               </motion.div>
             ))}
           </div>
           <motion.div
             className="text-center px-4 mt-16"
             initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}
           >
             <p className="text-2xl md:text-3xl font-semibold text-gray-100">Quality Orthopedic Care in Nelspruit</p>
           </motion.div>
         </div>
      </motion.section>
    </main>
  );
}