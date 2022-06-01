import { MailerOptions } from "@nestjs-modules/mailer";

export const MailerConfig: MailerOptions = {
  transport: {
    host: process.env.MAILER_HOST,
    service: process.env.MAILER_SERVICE,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_SECURE,
    auth: {
      user: process.env.MAILER_AUTH_USER,
      pass: process.env.MAILER_AUTH_PASS
    }
  },
  defaults: {
    from: process.env.MAILER_DEFAULT_FROM,
  },
};