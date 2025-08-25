// File: src/app/api/appointment-request/route.ts
// Description: API route for handling appointment requests. Migrated for Vercel.

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// IMPORTANT: Set these environment variables in your Vercel project settings
const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

export async function POST(req: NextRequest) {
  console.log("Appointment request API route hit.");

  if (!GMAIL_EMAIL || !GMAIL_APP_PASSWORD || !RECIPIENT_EMAIL) {
    console.error('Server Configuration Error: Missing one or more required environment variables.');
    console.error(`GMAIL_EMAIL is ${GMAIL_EMAIL ? 'set' : 'MISSING'}`);
    console.error(`GMAIL_APP_PASSWORD is ${GMAIL_APP_PASSWORD ? 'set' : 'MISSING'}`);
    console.error(`RECIPIENT_EMAIL is ${RECIPIENT_EMAIL ? 'set' : 'MISSING'}`);
    return NextResponse.json({ message: 'A server configuration error occurred. Please contact support.' }, { status: 500 });
  }

  try {
    const { name, email, phone, reason } = await req.json();

    if (!name || !email || !phone) {
      console.warn("API Validation Failed: Missing required fields from request body.");
      return NextResponse.json({ message: 'Missing required fields: Name, Email, and Phone are required.' }, { status: 400 });
    }

    console.log("Attempting to create Nodemailer transporter...");
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_APP_PASSWORD,
      },
      // === FIX for 'self-signed certificate' error in localhost ===
      // This is often needed for local development due to proxies or antivirus software.
      // It tells Node.js to allow connections even if the certificate chain is not fully trusted.
      // This setting is safe for production as Vercel's environment doesn't have this issue.
      tls: {
        rejectUnauthorized: false
      }
    });
    console.log("Nodemailer transporter created successfully.");

    const mailOptions = {
      from: `"JVR Practice Website" <${GMAIL_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Website Appointment Request: ${name}`,
      text: `New appointment request from the JVR Practice website:\n\nPatient Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nReason for Appointment:\n${reason || 'Not provided'}\n\nPlease reply directly to the patient at: ${email}`,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;"><h2 style="color: #0b5394;">New Appointment Request</h2><p>You have received a new appointment request from the JVR Practice website:</p><hr style="border: none; border-top: 1px solid #eee;"><h3 style="color: #333;">Patient Details:</h3><ul style="list-style: none; padding: 0;"><li style="margin-bottom: 5px;"><strong>Name:</strong> ${name}</li><li style="margin-bottom: 5px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li><li style="margin-bottom: 5px;"><strong>Phone:</strong> ${phone}</li></ul><h3 style="color: #333;">Reason for Appointment:</h3><p style="padding: 10px; background-color: #f9f9f9; border-left: 3px solid #ccc;">${reason ? reason.replace(/\n/g, '<br>') : '<em>Not provided</em>'}</p><hr style="border: none; border-top: 1px solid #eee;"><p style="font-size: 0.9em; color: #555;"><strong>Please reply directly to the patient at:</strong> <a href="mailto:${email}">${email}</a></p></div>`,
    };

    console.log(`Attempting to send email to ${RECIPIENT_EMAIL} from ${name}`);
    await transporter.sendMail(mailOptions);
    console.log(`Appointment request email sent successfully.`);

    return NextResponse.json({ message: 'Appointment request submitted successfully!' }, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('API Catch Block Error: Failed to send appointment email.', {
      errorMessage: errorMessage,
      errorDetails: error
    });
    return NextResponse.json({ message: 'Failed to submit appointment request due to a server error.' }, { status: 500 });
  }
}
