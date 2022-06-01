import { Client } from "./../../models/client.model";
import { User } from "./../../models/user.model";
import { AuthUser } from "@/models/auth-user.model";
import { AuthState } from "./auth.state";

export default {
  setAuthUser(state: AuthState, user: User | Client): void {
    state.authUser = user;

    localStorage.setItem("connectedUser", JSON.stringify(user));
  },

  setAuthState(
    state: AuthState,
    { user, accessToken, refreshToken }: AuthUser
  ): void {
    state.authUser = user;

    localStorage.setItem("connectedUser", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken.value);
    localStorage.setItem("refreshToken", refreshToken.value);
  },

  removeAuthUser(state: AuthState): void {
    state.authUser = undefined;

    localStorage.removeItem("connectedUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
