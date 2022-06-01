<template>
  <div id="google-login-button"></div>
</template>

<script lang="ts">
import RedirectIfAuthenticatedMixin from "@/mixins/redirect-if-authenticated.mixin";
import { Component } from "vue-property-decorator";
import { UserSocial } from "@/models/user-social.model";
import jwtDecode from "jwt-decode";

@Component
export default class GoogleLogin extends RedirectIfAuthenticatedMixin {
  get clientId() {
    return process.env.VUE_APP_GOOGLE_CLIENT_ID;
  }

  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const google = (window as any).google;
    if (google) {
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.onLogin,
      });

      google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        { theme: "outline", size: "large" } // customization attributes
      );
    }
  }

  getGoogleUserInfo(googleToken: string): UserSocial {
    const user = jwtDecode(googleToken) as {
      given_name: string;
      family_name: string;
      email: string;
    };

    return {
      firstname: user.given_name,
      lastname: user.family_name,
      email: user.email,
      birthYear: undefined,
    };
  }

  async onLogin({ credential }) {
    try {
      const userGoogle = this.getGoogleUserInfo(credential);
      await this.$store.dispatch("authStore/socialLoginOrRegister", userGoogle);

      return this.redirectIfAuthenticated();
    } catch (error) {
      this.$store.commit("eventStore/add", { name: "error" });
    }
  }
}
</script>
