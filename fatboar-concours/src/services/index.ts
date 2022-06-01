import axios from "axios";
import MailService from "./mail.service";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

export const mailService = new MailService(http);
