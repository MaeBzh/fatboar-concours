import { Body, Controller, Post } from "@nestjs/common";
import { MailContactDto } from "./dto/mail-contact.dto";
import { MailsService } from "./mails.service";

@Controller("mails")
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  @Post("/contact")
  public contact(@Body() mailContactDto: MailContactDto) {
    try {
      this.mailsService.sendMailContact(mailContactDto);
    } catch (error) {
      console.error(error);
    }
  }
}
