import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { MailerConfig } from "../mailerconfig";
import { MailsController } from "./mails.controller";
import { MailsService } from "./mails.service";

@Module({
  imports: [MailerModule.forRoot(MailerConfig)],
  controllers: [MailsController],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
