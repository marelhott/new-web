import nodemailer from "nodemailer";

export function getMailerTransporter() {
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

export function getMailerFromAddress() {
  return process.env.SMTP_FROM || process.env.SMTP_USER || "info@malirivcernem.cz";
}

export function getLeadNotificationEmail() {
  return process.env.LEAD_NOTIFICATION_EMAIL || "info@malirivcernem.cz";
}
