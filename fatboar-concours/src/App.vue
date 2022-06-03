<template>
  <v-app>
    <app-bar />
    <v-main class="secondary">
      <v-container fluid class="secondary">
        <event-alert />
        <facebook-login :hidden="true" />
        <rgpd-consent>
          <router-view> </router-view>
        </rgpd-consent>
      </v-container>
    </v-main>
    <footer-bar />
  </v-app>
</template>

<script lang="ts">
import { VFBLoginScope as VFacebookLoginScope } from "vue-facebook-login-component";
import { Vue, Component } from "vue-property-decorator";
import AppBar from "@/layouts/default/AppBar.vue";
import FooterBar from "@/layouts/default/FooterBar.vue";
import RgpdConsent from "./components/commons/RgpdConsent.vue";
import EventAlert from "./components/commons/EventAlert.vue";
import FacebookLogin from "./components/auth/FacebookLogin.vue";

@Component({
  components: {
    AppBar,
    FooterBar,
    RgpdConsent,
    EventAlert,
    VFacebookLoginScope,
    FacebookLogin,
  },
  metaInfo() {
    return {
      title: "Site du jeu-concours organisé par Fatboar",
      content:
        "Jeu-concours organisé par les restaurants de gibier Fatboar. De nombreux cadeaux à gagner : hamburgers de gibier, entrée ou dessert, menus, réductions",
    };
  },
})
export default class App extends Vue {}
</script>

<style>
@font-face {
  font-family: "barristar";
  src: local("barristar"),
    url(/assets/fonts/barristar/barristar.otf) format("opentype");
}
@font-face {
  font-family: "berniershade";
  src: local("berniershade"),
    url(/assets/fonts/berniershade/BERNIERShade-Regular.otf) format("opentype");
}
@font-face {
  font-family: "lato-regular";
  src: local("lato"),
    url(/assets/fonts/lato/Lato-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "lato-thin";
  src: local("lato"), url(/assets/fonts/lato/Lato-Thin.ttf) format("truetype");
}
@font-face {
  font-family: "lato-italic";
  src: local("lato"),
    url(/assets/fonts/lato/Lato-LightItalic.ttf) format("truetype");
}

.container {
  font-family: "lato-regular";
}

.card-title {
  text-transform: uppercase;
}

.fatboar-title {
  font-family: "berniershade";
  font-size: 2em;
  font-weight: 400;
}

.fatboar-subtitle {
  font-family: "barristar";
}

.v-btn--active {
  background-color: #ffc24d;
}

.v-btn--active > .v-btn__content {
  color: #010326;
}

.v-btn--active > .v-icon {
  background-color: #010326;
}

.v-list--nav .v-list-item {
  padding: 0 6px !important;
}
</style>
