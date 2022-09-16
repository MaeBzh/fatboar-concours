import { AuthUser } from "@/models/auth-user.model";
import { UserLogin } from "@/models/user-login.model";
import { UserRegister } from "@/models/user-register.model";
import { UserSocial } from "@/models/user-social.model";
import router from "@/plugins/vue-router";
import { AxiosInstance, AxiosResponse } from "axios";
import { UserResetPassword } from "./../models/user-reset-password.model";

export class AuthResource {
  constructor(protected http: AxiosInstance) {}

  async login(user: UserLogin): Promise<AuthUser> {
    const response: AxiosResponse = await this.http.post(
      "authentication/logn",
      user
    );
    return response.data;
  }

  async register(user: UserRegister): Promise<{ response: string }> {
    const activateUrl = router.resolve({
      name: "activateAccount",
      params: { token: "token" },
    }).href;

    const response: AxiosResponse = await this.http.post(
      "authentication/register",
      { ...user, activateUrl: `${window.location.origin}${activateUrl}` }
    );
    return response.data;
  }

  async activateAccount(token: string): Promise<void> {
    return this.http.get(`authentication/activateAccount/${token}`);
  }

  async sendResetPassword(email: string): Promise<void> {
    const resetPasswordUrl = router.resolve({
      name: "resetPassword",
      params: { token: "token" },
    }).href;

    return this.http.post(`authentication/resetPassword/send`, {
      email,
      resetPasswordUrl: `${window.location.origin}${resetPasswordUrl}`,
    });
  }

  async resetPassword(userResetPassword: UserResetPassword): Promise<void> {
    return this.http.post(`authentication/resetPassword`, userResetPassword);
  }

  async socialLogin(user: UserSocial): Promise<AuthUser | null> {
    const response = await this.http.post("authentication/login/social", {
      email: user.email,
    });
    return response.data;
  }

  async socialRegister(user: UserSocial) {
    const response = this.http.post("authentication/register/social", user);

    return (await response).data;
  }
}
