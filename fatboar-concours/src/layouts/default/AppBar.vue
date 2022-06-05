<template>
  <div v-if="!isMobile" class="secondary">
    <v-app-bar color="primary" dark height="100">
      <a @click="goHome">
        <div
          class="accent--text d-flex flex-row align-center text-no-wrap fatboar-title"
        >
          <v-img
            src="/assets/images/logo_color.png"
            max-width="90"
            max-height="90"
            class="ma-2 d-flex"
            alt="Le logo Fatboar : une tête de sanglier rouge"
          />
          <h1 class="text-no-wrap fatboar-title pl-10">
            Fatboar
            <span class="fatboar-subtitle">burger restaurant</span>
          </h1>
        </div>
      </a>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon
          size="x-large"
          aria-label="Facebook"
          role="link"
          aria-hidden="false"
          color="accent"
          >mdi-facebook</v-icon
        >
      </v-btn>

      <v-btn icon>
        <v-icon
          size="x-large"
          aria-label="Twitter"
          role="link"
          aria-hidden="false"
          color="accent"
          >mdi-twitter</v-icon
        >
      </v-btn>

      <v-btn icon>
        <v-icon
          size="x-large"
          aria-label="Instagram"
          role="link"
          aria-hidden="false"
          color="accent"
          >mdi-instagram</v-icon
        >
      </v-btn>
      <template v-if="authenticated">
        <v-divider vertical class="divider"></v-divider>
        <template v-if="isClient">
          <v-btn
            class="mr-4"
            outlined
            x-large
            rounded
            text
            color="accent"
            :to="{ name: 'game' }"
            >Jouer
            <v-icon
              size="x-large"
              class="ml-4 main-btn"
              aria-label="Participer au jeu-concours"
              role="link"
              aria-hidden="false"
              >mdi-dice-multiple-outline</v-icon
            >
          </v-btn>
          <v-btn :to="{ name: 'profile' }" icon>
            <v-icon
              size="x-large"
              aria-label="Mon profil"
              role="link"
              aria-hidden="false"
              color="accent"
              >mdi-account</v-icon
            >
          </v-btn>
        </template>
        <template v-if="isAdmin">
          <v-btn
            class="mr-4"
            outlined
            x-large
            rounded
            text
            color="accent"
            :to="{ name: 'charts' }"
            >Tableau de bord
            <v-icon
              size="x-large"
              class="ml-4 main-btn"
              aria-label="Accès au tableau de bord"
              role="link"
              aria-hidden="false"
              >mdi-chart-tree</v-icon
            >
          </v-btn>
        </template>
        <template v-if="isEmployee">
          <v-btn
            class="mr-4"
            outlined
            x-large
            rounded
            text
            color="accent"
            :to="{ name: 'verifyGift' }"
            >Vérifier un gain
            <v-icon
              size="x-large"
              class="ml-4 main-btn"
              aria-label="Vérifier uyn gain"
              role="link"
              aria-hidden="false"
              >mdi-check</v-icon
            >
          </v-btn>
        </template>
      </template>
    </v-app-bar>
    <log-button
      :authenticated="authenticated"
      class="mt-0 mb-4 mr-4"
    ></log-button>
  </div>

  <div v-else class="secondary">
    <v-app-bar color="primary" dark height="80">
      <v-row>
        <a @click="goHome">
          <div
            class="accent--text d-flex flex-row align-center text-no-wrap fatboar-title"
          >
            <v-img
              src="/assets/images/logo_color.png"
              max-width="70"
              max-height="70"
              class="ma-2"
              alt="Le logo Fatboar : une tête de sanglier rouge"
            />
            <h1 class="text-no-wrap fatboar-title-mobile pl-3">
              Fatboar
              <span class="fatboar-subtitle">burger restaurant</span>
            </h1>
          </div>
        </a>
      </v-row>
    </v-app-bar>
    <v-app-bar color="primary" dark height="60">
      <v-btn icon>
        <v-icon
          size="x-large"
          aria-label="Facebook"
          role="link"
          aria-hidden="false"
          color="accent"
          >mdi-facebook</v-icon
        >
      </v-btn>

      <v-btn icon>
        <v-icon
          size="x-large"
          aria-label="Twitter"
          role="link"
          aria-hidden="false"
          color="accent"
          >mdi-twitter</v-icon
        >
      </v-btn>

      <v-btn icon>
        <v-icon
          size="x-large"
          aria-label="Instagram"
          role="link"
          aria-hidden="false"
          color="accent"
          >mdi-instagram</v-icon
        >
      </v-btn>
      <template v-if="authenticated">
        <v-divider vertical class="divider"></v-divider>
        <template v-if="isClient">
          <v-btn
            class="mr-4"
            outlined
            x-large
            rounded
            text
            color="accent"
            :to="{ name: 'game' }"
            >Jouer
            <v-icon
              size="x-large"
              class="ml-4 main-btn"
              aria-label="Participer au jeu-concours"
              role="link"
              aria-hidden="false"
              >mdi-dice-multiple-outline</v-icon
            >
          </v-btn>
          <v-btn :to="{ name: 'profile' }" icon>
            <v-icon
              size="x-large"
              aria-label="Mon profil"
              role="link"
              aria-hidden="false"
              color="accent"
              >mdi-account</v-icon
            >
          </v-btn>
        </template>
        <template v-if="isAdmin">
          <v-btn
            class="mr-4"
            outlined
            x-large
            rounded
            text
            color="accent"
            :to="{ name: 'dashboard' }"
            >Tableau de bord
            <v-icon
              size="x-large"
              class="ml-4 main-btn"
              aria-label="Accès au tableau de bord"
              role="link"
              aria-hidden="false"
              >mdi-chart-tree</v-icon
            >
          </v-btn>
        </template>
        <template v-if="isEmployee">
          <v-btn
            class="mr-4"
            outlined
            x-large
            rounded
            text
            color="accent"
            :to="{ name: 'verifyGift' }"
            >Vérifier
            <v-icon
              size="x-large"
              class="ml-4 main-btn"
              aria-label="Vérifier un gain"
              role="link"
              aria-hidden="false"
              >mdi-check</v-icon
            >
          </v-btn>
        </template>
      </template>
    </v-app-bar>
    <log-button
      :authenticated="authenticated"
      class="mt-0 mb-4 mr-4"
    ></log-button>
  </div>
</template>

<script lang="ts">
import LogButton from "@/components/commons/LogButton.vue";
import { Component, Vue } from "vue-property-decorator";
import { isMobile } from "@/helpers/utils";

@Component({
  components: {
    LogButton,
  },
})
export default class AppBar extends Vue {
  get isMobile() {
    return isMobile();
  }

  get authUser() {
    return this.$store.getters["authStore/getAuthUser"];
  }

  get authenticated() {
    return !!this.authUser;
  }

  get isAdmin() {
    return this.authenticated && this.authUser.role.name === "admin";
  }

  get isEmployee() {
    return this.authenticated && this.authUser.role.name === "employee";
  }

  get isClient() {
    return this.authenticated && this.authUser.role.name === "client";
  }

  public goHome() {
    this.$router.push({ name: "home" });
  }
}
</script>

<style scoped>
.v-toolbar {
  flex: none;
}
.divider {
  margin-inline: 1em;
}

.main-btn {
  color: #ffc24d;
}

.fatboar-title-mobile {
  font-size: 1em;
  font-weight: normal !important;
}
</style>
