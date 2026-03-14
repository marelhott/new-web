import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { createBusinessInquiryEmail, createCustomerConfirmationEmail } from "@/emails/calculatorEmails";
import {
  isCalculatorInquiryPayload,
  validateCalculatorInquiry,
} from "@/lib/calculatorInquiry";

type ApiResponse = {
  ok: boolean;
  message: string;
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error("SMTP není nakonfigurované.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  if (!isCalculatorInquiryPayload(req.body)) {
    return res.status(400).json({ ok: false, message: "Neplatná data formuláře." });
  }

  const validationError = validateCalculatorInquiry(req.body);
  if (validationError) {
    return res.status(400).json({ ok: false, message: validationError });
  }

  try {
    const transporter = getTransporter();
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    const businessRecipient = process.env.LEAD_NOTIFICATION_EMAIL || "info@malirivcernem.cz";

    const businessEmail = createBusinessInquiryEmail(req.body);
    const customerEmail = createCustomerConfirmationEmail(req.body);

    await transporter.sendMail({
      from,
      to: businessRecipient,
      replyTo: req.body.email,
      subject: businessEmail.subject,
      html: businessEmail.html,
      text: businessEmail.text,
    });

    await transporter.sendMail({
      from,
      to: req.body.email,
      replyTo: businessRecipient,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
    });

    return res.status(200).json({ ok: true, message: "Poptávka byla odeslána." });
  } catch (error) {
    console.error("Calculator inquiry email failed", error);
    return res.status(500).json({ ok: false, message: "Odeslání se nepodařilo." });
  }
}
