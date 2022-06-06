import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { MailContactDto } from "./dto/mail-contact.dto";

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}

  sendMail(sendMailOptions: ISendMailOptions): Promise<any> {
    return this.mailerService.sendMail({
      ...sendMailOptions,
      to:
        process.env.NODE_ENV === "production"
          ? sendMailOptions.to
          : process.env.MAILER_FORCE_TO,
    });
  }

  sendMailContact(mailContactDto: MailContactDto) {
    return this.sendMail({
      to: process.env.MAILER_FORCE_TO,
      from: mailContactDto.from, // list of receivers
      subject: mailContactDto.subject, // Subject line
      text: mailContactDto.content,
    });
  }

  sendMailRegister(user: User, activateUrlTemplate: string) {
    const activateUrl = activateUrlTemplate.replace("token", user.accountToken);

    this.sendMail({
      to: user.email,
      subject: "Bienvenue", // Subject line
      html: `<p>Bonjour ${user.firstname}, <br /> Votre compte a bien été créé.<br /></p>
      <p>Vous pouvez l'activer dès à présent  en cliquant <a href="${activateUrl}">ici</a></p>`,
    });
  }

  sendMailResetPassword(user: User, resetPasswordUrlTemplate: string) {
    const resetPasswordUrl = resetPasswordUrlTemplate.replace(
      "token",
      user.accountToken
    );

    this.sendMail({
      to: user.email,
      subject: "Bienvenue", // Subject line
      html: `<p>Bonjour ${user.firstname}, <br /> Vous avez demandé la réinitialisation de votre mot de passe.<br /></p>
      <p>Vous pouvez dès à présent choisir un nouveau mot de passe en cliquant <a href="${resetPasswordUrl}">ici</a></p>`,
    });
  }
}
