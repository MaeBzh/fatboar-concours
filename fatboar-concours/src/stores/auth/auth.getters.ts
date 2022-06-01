import { AuthState } from "./auth.state";

export default {
  getAuthUser: (state: AuthState) => state.authUser,
};
