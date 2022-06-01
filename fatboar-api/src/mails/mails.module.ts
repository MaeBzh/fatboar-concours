import { MailsController } from "./mails.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { MailsService } from "./mails.service";
import { MailerConfig } from "src/mailerconfig";


@Module({
  imports: [MailerModule.forRoot(MailerConfig)],
  controllers: [MailsController],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
