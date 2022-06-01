export type UserRegister = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;

  rgpdConsent: Date;
  sms: boolean;
  newsletter: boolean;
  birthYear: Date;
  remember: boolean;
};
