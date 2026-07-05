import nodemailer, { type Transporter } from "nodemailer";
import { env } from "../config/env.js";

/**
 * Transporter SMTP compartilhado (Hostinger).
 *
 * `secure: true` porque a porta 465 usa SSL/TLS implícito — mesma configuração
 * da Edge Function original.
 */
export const transporter: Transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});
