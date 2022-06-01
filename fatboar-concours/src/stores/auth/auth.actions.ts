import { UserResetPassword } from "./../../models/user-reset-password.model";
import { UserSocial } from "./../../models/user-social.model";
import { AuthUser } from "../../models";
import { UserLogin } from "../../models/user-login.model";
import { UserRegister } from "../../models/user-register.model";
import { authResource } from "./../../resources/index";

export default {
  async login({ commit }, userLogin: UserLogin): Promise<void> {
    const authUser: AuthUser = await authResource.login(userLogin);
    commit("setAuthState", authUser);
  },

  async register(ctx: unknown, user: UserRegister): Promise<void> {
    await authResource.register(user);
  },

  async activateAccount(ctx: unknown, token: string): Promise<void> {
    return authResource.activateAccount(token);
  },

  async sendResetPassword(ctx: unknown, email: string): Promise<void> {
    return authResource.sendResetPassword(email);
  },

  async resetPassword(
    ctx: unknown,
    userResetPassword: UserResetPassword
  ): Promise<void> {
    return authResource.resetPassword(userResetPassword);
  },

  async socialLoginOrRegister({ commit }, user: UserSocial): Promise<void> {
    let authUser = await authResource.socialLogin(user);

    if (!authUser) {
      authUser = await authResource.socialRegister(user);
    }

    if (authUser) {
      commit("setAuthState", authUser);
    }
  },
};
