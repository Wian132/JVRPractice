// File: src/app/api/appointment-request/route.ts
// Description: API route for handling appointment requests. Migrated for Vercel.

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// IMPORTANT: Set these environment variables in your Vercel project settings
const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

// Basic sanitization function to escape HTML characters
const sanitize = (text: string) => {
  if (!text) return '';
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export async function POST(req: NextRequest) {
  // Recommendation: Implement rate limiting here to prevent abuse.
  // Libraries like 'upstash/ratelimit' are a good option for Vercel Edge functions.

  if (!GMAIL_EMAIL || !GMAIL_APP_PASSWORD || !RECIPIENT_EMAIL) {
    return NextResponse.json({ message: 'A server configuration error occurred. Please contact support.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { name, email, phone, reason } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ message: 'Missing required fields: Name, Email, and Phone are required.' }, { status: 400 });
    }

    // Sanitize all user inputs before using them
    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedPhone = sanitize(phone);
    const sanitizedReason = sanitize(reason);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"JVR Practice Website" <${GMAIL_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      replyTo: sanitizedEmail,
      subject: `Website Appointment Request: ${sanitizedName}`,
      text: `New appointment request from the JVR Practice website:\n\nPatient Details:\nName: ${sanitizedName}\nEmail: ${sanitizedEmail}\nPhone: ${sanitizedPhone}\n\nReason for Appointment:\n${sanitizedReason || 'Not provided'}\n\nPlease reply directly to the patient at: ${sanitizedEmail}`,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;"><h2 style="color: #0b5394;">New Appointment Request</h2><p>You have received a new appointment request from the JVR Practice website:</p><hr style="border: none; border-top: 1px solid #eee;"><h3 style="color: #333;">Patient Details:</h3><ul style="list-style: none; padding: 0;"><li style="margin-bottom: 5px;"><strong>Name:</strong> ${sanitizedName}</li><li style="margin-bottom: 5px;"><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></li><li style="margin-bottom: 5px;"><strong>Phone:</strong> ${sanitizedPhone}</li></ul><h3 style="color: #333;">Reason for Appointment:</h3><p style="padding: 10px; background-color: #f9f9f9; border-left: 3px solid #ccc;">${sanitizedReason ? sanitizedReason.replace(/\n/g, '<br>') : '<em>Not provided</em>'}</p><hr style="border: none; border-top: 1px solid #eee;"><p style="font-size: 0.9em; color: #555;"><strong>Please reply directly to the patient at:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p></div>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Appointment request submitted successfully!' }, { status: 200 });

  } catch {
    return NextResponse.json({ message: 'Failed to submit appointment request due to a server error.' }, { status: 500 });
  }
}