<template>
  <div v-if="initialized" class="home">
    <div class="upper-div">
      <v-row v-if="!authenticated">
        <v-spacer></v-spacer>
        <v-btn class="accent primary--text mr-4 identification-btn"
          >Identifiez-vous</v-btn
        >
      </v-row>
      <v-row class="d-flex justify-center mb-8">
        <v-img
          src="/assets/images/presentation-image.png"
          max-height="90%"
          max-width="70%"
          class="mt-8"
          alt="Un hamburger et des frites posés sur une planche en bois"
        />
      </v-row>
      <v-row class="upper-description d-flex flex-column align-center">
        <v-row class="upper-title">Grand jeu-concours</v-row>
        <v-row class="upper-subtitle align-center">
          <v-col class="upper-jackpot-image-left">
            <v-img
              :src="jackpotImage"
              max-width="100px"
              alt="Le cadeau jackpot du jeu-concours"
            />
          </v-col>
          <v-col class="upper-subtitle-text col-auto">
            Du {{ dateBegin }} au {{ dateEnd }}
          </v-col>

          <v-col upper-jackpot-image-left>
            <v-img
              :src="jackpotImage"
              max-width="100px"
              alt="Le cadeau jackpot du jeu-concours"
            />
          </v-col>
        </v-row>
        <v-row class="upper-text mt-8" width="50%">{{
          currentGame.description
        }}</v-row
        >>
      </v-row>
    </div>

    <div class="middle-div">
      <div class="middle-title">Plein de cadeaux à gagner</div>
      <div class="middle-gifts-list">
        <div class="middle-gift" v-for="gift in gifts" :key="gift.id">
          <div class="middle-gift-photo">{{ gift.photo }}</div>
          <v-icon class="middle-gift-icon">{{ gift.icon }}</v-icon>
          <div class="middle-gift-name">{{ gift.name }}</div>
        </div>
      </div>
    </div>

    <div class="bottom-div">
      <h3>Ne ratez aucune info !</h3>
      <p>
        Pour rester informés, recevoir nos offres promotionnelles, découvrir nos
        nouveaux burgers, suivez-nous sur les réseaux sociaux :
      </p>
      <div class="bottom-social">
        <div v-for="social in socials" :key="social.name">
          <span class="social-name">{{ social.name }}</span>
          <v-icon class="social-icon">{{ social.icon }}</v-icon>
        </div>
      </div>
    </div>
    <p>
      Vous pouvez également vous inscrire et vous abonner à notre
      <a>newsletter</a>
    </p>
    <v-icon>mdi-food</v-icon>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";
import { Component, Vue } from "vue-property-decorator";
import { fr } from "date-fns/locale";
import FileDownloadMixin from "@/mixins/file-download.mixin";

@Component
export default class Home extends FileDownloadMixin {
  public initialized = false;
  public gifts = null;
  public jackpot = null;
  public socials = [
    { name: "Facebook", icon: "mdi-facebook" },
    { name: "Twitter", icon: "mdi-twitter" },
    { name: "Instagram", icon: "mdi-instagram" },
  ];

  get authenticated() {
    return false;
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

  get jackpotImage() {
    const photo = this.currentGame?.jackpotGift.photo;
    return photo ? this.getFileUrl(photo) : "";
  }

  get giftsOfCurrentGame() {
    return this.$store.getters["giftStore/getGiftsForOneGame"];
  }
  get jackpotOfCurrentGame() {
    return this.$store.getters["giftStore/getJackpotGift"];
  }

  created() {
    this.initialized = false;
    this.$store
      .dispatch("gameStore/fetchAll")
      .then(() => {
        this.$store.getters["gameStore/getCurrentGame"];
        // this.gifts = this.giftsOfCurrentGame(this.currentGame.id);
        // this.jackpot = this.jackpotOfCurrentGame(this.currentGame.id);
      })
      .finally(() => {
        this.initialized = true;
      });
  }
}
</script>

<style scoped>
.upper-title {
  font-family: "lato-regular";
  font-weight: 900;
  font-size: 5em;
}

.upper-subtitle-text {
  font-family: "lato-regular";
  font-size: 1.5em;
}

.upper-jackpot-image-left {
  transform: scaleX(-1);
}

.identification-btn {
  border-top-left-radius: 0%;
  border-top-right-radius: 0%;
}
</style>
