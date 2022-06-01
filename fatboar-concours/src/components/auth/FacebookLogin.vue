<template>
  <div>
    <v-facebook-login
      v-if="!hidden"
      :app-id="appId"
      :version="version"
      sdk-local="fr_FR"
      @login="onLogin"
    />
    <!-- only for init window.FB (sdk) for be able to logout in Logout component -->
    <v-facebook-login-scope
      v-else
      :app-id="appId"
      :version="version"
      sdk-local="fr_FR"
    />
  </div>
</template>

<script lang="ts">
import RedirectIfAuthenticatedMixin from "@/mixins/redirect-if-authenticated.mixin";
import VFacebookLogin, {
  VFBLoginScope as VFacebookLoginScope,
} from "vue-facebook-login-component";
import { Component, Prop } from "vue-property-decorator";
import axios from "axios";
import { getYear } from "date-fns";
import { UserSocial } from "@/models/user-social.model";

@Component({
  components: {
    VFacebookLogin,
    VFacebookLoginScope,
  },
})
export default class FacebookLogin extends RedirectIfAuthenticatedMixin {
  @Prop({ default: false }) readonly hidden!: boolean;

  get appId() {
    return process.env.VUE_APP_FACEBOOK_APP_ID;
  }

  get version() {
    return process.env.VUE_APP_FACEBOOK_VERSION;
  }

  async getFacebookUserInfo({
    userID,
    accessToken,
  }: {
    userID: string;
    accessToken: string;
  }): Promise<UserSocial> {
    const { data } = await axios.get(
      `https://graph.facebook.com/${userID}?fields=id,first_name,last_name,birthday,email&access_token=${accessToken}`
    );

    return {
      firstname: data.first_name,
      lastname: data.last_name,
      email: data.email,
      birthYear: data.birthday ? getYear(new Date()).toString() : undefined,
    };
  }

  async onLogin({ authResponse }): Promise<void> {
    try {
      const userFacebook = await this.getFacebookUserInfo(authResponse);
      await this.$store.dispatch(
        "authStore/socialLoginOrRegister",
        userFacebook
      );

      return this.redirectIfAuthenticated();
    } catch (error) {
      this.$store.commit("eventStore/add", { name: "error" });
    }
  }
}
</script>
