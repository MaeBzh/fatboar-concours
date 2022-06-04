<template>
  <div class="d-flex flex-column align-center accent">
    <v-card-title class="primary--text card-title">
      Vous avez gagné
    </v-card-title>
    <v-card-text class="text-center">
      {{ winningTicket.gift.name }}
    </v-card-text>
    <v-img
      :src="getGiftImage(winningTicket.gift.photo)"
      max-height="200px"
      max-width="200px"
      class="text-center"
      :alt="winningTicket.gift.name"
    >
    </v-img>
    <div>
      <v-card-text v-if="winningTicket.withdrawnOn"
        >Vous avez déjà utilisé ce lot.
      </v-card-text>
      <v-card-text v-else>
        Vous pouvez dès à présent vous rendre dans votre restaurant favori muni
        du ticket de caisse afin d'utiliser votre lot.
      </v-card-text>
    </div>
    <v-btn color="primary accent--text mb-4" @click.stop="$emit('input', null)"
      >Essayer un autre numéro</v-btn
    >
  </div>
</template>
<script lang="ts">
import { formatDate, OuiNon } from "@/helpers/utils";
import FileDownloadMixin from "@/mixins/file-download.mixin";
import { WinningTicket } from "@/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ShowGift extends FileDownloadMixin {
  @Prop() readonly value?: WinningTicket;
  public formatDate = formatDate;
  public ouiNon = OuiNon;

  get winningTicket() {
    return this.value;
  }

  getGiftImage(filename: string): string {
    return this.getFileUrl(filename);
  }
}
</script>
<style>
.gift-title {
  font-size: 2em;
  text-shadow: 2px 2px #010326;
}

.gift-subtitle {
  font-size: 2em;
}

.history-title {
  font-family: "lato-thin";
  font-size: 2em;
  text-decoration: underline;
}

.gift-field {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
