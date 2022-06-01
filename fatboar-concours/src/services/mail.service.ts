import { Mail } from "./../types/mail";
import { AxiosInstance } from "axios";

export default class MailService {
  constructor(protected http: AxiosInstance) {}

  async contact(message: Mail): Promise<void> {
    await this.http.post("/mails/contact", message);
  }
}
