<template>
  <div v-if="initialized">
    <template v-if="currentGame">
      <template v-if="!isMobile">
        <div class="upper-div">
          <v-row class="upper-description d-flex flex-column align-center">
            <v-row class="fatboar">Fatboar</v-row>
            <v-row class="upper-title">Grand jeu-concours</v-row>
            <v-row class="upper-subtitle align-center ma-8">
              <v-col class="upper-jackpot-image-left">
                <v-img :src="jackpotImage" max-width="100px" />
              </v-col>
              <v-col class="upper-subtitle-text col-auto">
                Du {{ dateBegin }} au {{ dateEnd }}
              </v-col>

              <v-col upper-jackpot-image-left>
                <v-img :src="jackpotImage" max-width="100px" />
              </v-col>
            </v-row>
            <v-img
              src="/assets/images/presentation-image.png"
              max-height="80%"
              max-width="60%"
              class="mt-8"
              alt="Un hamburger et des frites posés sur une planche en bois"
            />
            <v-col class="upper-text mt-8 mb-8 col-8 text-center">{{
              currentGame.description
            }}</v-col>
          </v-row>
        </div>
      </template>
      <template v-else>
        <div class="upper-div mt-4">
          <v-row class="upper-description d-flex flex-column align-center">
            <v-row class="upper-title-mobile">Grand jeu-concours</v-row>
            <v-img
              src="/assets/images/presentation-image.png"
              max-width="100%"
              class="mt-8"
              alt="Un hamburger et des frites posés sur une planche en bois"
            />
            <v-row class="upper-subtitle-mobile align-center ma-8">
              Du {{ dateBegin }} au {{ dateEnd }}
            </v-row>
            <v-row upper-jackpot-image-left>
              <v-img :src="jackpotImage" max-width="100px" />
            </v-row>

            <v-col class="upper-text mt-8 mb-8 col-8 text-center">{{
              currentGame.description
            }}</v-col>
          </v-row>
        </div>
      </template>

      <v-row class="middle-div accent pa-4 d-flex flex-column align-center">
        <v-row>
          <v-col class="middle-title col-auto text-center"
            >De nombreux cadeaux à gagner</v-col
          >
        </v-row>
        <v-row class="middle-gifts-list ma-4 mb-8">
          <div
            class="middle-gift"
            v-for="gameGift in currentGame.gameGifts"
            :key="gameGift.gift.id"
          >
            <div class="middle-gift-photo mb-4">
              <v-img
                :src="giftImage(gameGift.gift)"
                width="180px"
                :alt="gameGift.name"
              ></v-img>
            </div>
            <v-icon class="middle-gift-icon primary--text mb-4">{{
              gameGift.gift.icon
            }}</v-icon>
            <div class="middle-gift-name">{{ gameGift.gift.name }}</div>
          </div>
        </v-row>
      </v-row>

      <div class="bottom-div pa-8 d-flex flex-column align-center mt-8">
        <v-row>
          <v-col class="col-auto text-center bottom-title">
            <h3>Ne ratez aucune info !</h3>
          </v-col>
        </v-row>
        <v-row>
          <p class="mt-4">
            Pour rester informés, recevoir nos offres promotionnelles, découvrir
            nos nouveaux burgers, suivez-nous sur les réseaux sociaux :
          </p>
        </v-row>
        <template v-if="!isMobile">
          <v-row class="bottom-social mt-4">
            <div v-for="social in socials" :key="social.name">
              <span class="social-name">{{ social.name }}</span>
              <v-icon class="social-icon mr-8 ml-2 primary--text">{{
                social.icon
              }}</v-icon>
            </div>
          </v-row>
        </template>
        <template v-else>
          <v-row
            v-for="social in socials"
            :key="social.name"
            class="bottom-social mt-4"
          >
            <span class="social-name">{{ social.name }}</span>
            <v-icon class="social-icon mr-8 ml-2 primary--text">{{
              social.icon
            }}</v-icon>
          </v-row>
        </template>
      </div>
      <div class="d-flex flex-column align-center mt-10">
        <p>
          Vous pouvez également vous
          <router-link :to="{ name: login }">inscrire</router-link> et vous
          abonner à notre newsletter.
        </p>
        <v-icon class="primary--text mb-8">mdi-food</v-icon>
      </div>
    </template>
    <template v-else><no-current-game></no-current-game></template>
  </div>
  <div v-else class="d-flex justify-center">
    <v-skeleton-loader
      type="card-avatar, article, actions"
      width="50%"
      height="100%"
    ></v-skeleton-loader>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";
import { Component } from "vue-property-decorator";
import { fr } from "date-fns/locale";
import { Gift } from "@/models";
import NoCurrentGame from "../components/client-screens/NoCurrentGame.vue";
import FileDownloadMixin from "@/mixins/file-download.mixin";
import { isMobile } from "@/helpers/utils";

@Component({
  metaInfo() {
    return {
      title: "Page d'accueil du jeu-concours Fatboar",
      content:
        "Jeu-concours organisé par les restaurants de gibier Fatboar. De nombreux cadeaux à gagner : hamburgers de gibier, entrée ou dessert, menus, réductions",
    };
  },
  components: { NoCurrentGame },
})
export default class Home extends FileDownloadMixin {
  public initialized = false;
  public gifts = null;
  public jackpot = null;
  public socials = [
    { name: "Facebook", icon: "mdi-facebook" },
    { name: "Twitter", icon: "mdi-twitter" },
    { name: "Instagram", icon: "mdi-instagram" },
  ];
  public snackbar = false;
  public snackbarMessage = "";

  get authenticated() {
    return localStorage.getItem("user") ? true : false;
  }

  get isMobile() {
    return isMobile();
  }

  get userAgent() {
    return navigator.userAgent;
  }

  get currentGame() {
    return this.$store.getters["gameStore/getCurrentGame"];
  }

  get dateBegin(): string {
    return format(new Date(this.currentGame.startsOn), "PPPP", { locale: fr });
  }

  get dateEnd(): string {
    return format(new Date(this.currentGame.endsOn), "PPPP", { locale: fr });
  }

  get jackpotImage(): string {
    const photo = this.currentGame?.jackpotGift.photo;
    return photo ? this.getFileUrl(photo) : "";
  }

  giftImage(gift: Gift): string {
    return this.getFileUrl(gift.photo);
  }

  mounted() {
    this.initialized = false;
    this.$store.dispatch("gameStore/fetchCurrentGame").finally(() => {
      this.initialized = true;
    });
  }
}
</script>

<style scoped>
.upper-title {
  font-weight: 900;
  font-size: 5em;
}

.upper-subtitle-text {
  font-size: 1.5em;
}

.upper-jackpot-image-left {
  transform: scaleX(-1);
}

.middle-title {
  font-size: 2.5em;
  font-weight: 900;
}

.bottom-title {
  font-family: "lato-thin";
  font-size: 2em;
}

.middle-gifts-list {
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
}

.middle-gift {
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  margin: 2em;
}

.middle-gift-name {
  align-self: center;
}

.fatboar-link {
  text-decoration: underline;
}

.fatboar {
  font-family: "berniershade";
  font-size: 6em;
}

.fatboar-mobile {
  font-family: "berniershade";
  font-size: 2em;
}

.upper-title-mobile {
  font-weight: 900;
  font-size: 2em;
}

.upper-subtitle-mobile {
  font-size: 0.8em;
  font-weight: bold;
}
</style>
