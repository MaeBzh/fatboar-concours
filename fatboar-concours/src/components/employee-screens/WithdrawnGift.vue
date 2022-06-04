<template>
  <v-container class="d-flex justify-center">
    <div class="d-flex flex-column align-center">
      <v-card-title class="primary--text card-title">
        cadeau gagné
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
      <template v-if="winningTicket.withdrawnOn">
        <p>Ce cadeau a été récupéré par le client le {{ withdrawnDate }}</p>
      </template>
      <template v-else>
        <v-btn
          type="submit"
          @click="submit"
          color="primary accent--text mb-4"
          >{{
            isMobile
              ? "Marquer comme récupéré"
              : "Marquer ce cadeau comme récupéré"
          }}</v-btn
        ></template
      >

      <v-btn color="primary accent--text mb-4" @click.stop="$emit('reset')"
        >Vérifier un autre ticket</v-btn
      >
    </div>
  </v-container>
</template>
<script lang="ts">
import { formatDate, isMobile } from "@/helpers/utils";
import FileDownloadMixin from "@/mixins/file-download.mixin";
import { WinningTicket } from "@/models";
import { winningTicketResource } from "@/resources";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class WithdrawnGift extends FileDownloadMixin {
  @Prop() readonly value!: WinningTicket;
  public formatDate = formatDate;
  public isMobile = isMobile;

  get winningTicket() {
    return this.value;
  }

  set winningTicket(value) {
    this.winningTicket = value;
  }

  get withdrawnDate() {
    if (this.winningTicket?.withdrawnOn) {
      return formatDate(this.winningTicket?.withdrawnOn, "P");
    }
    return null;
  }

  getGiftImage(filename: string): string {
    return this.getFileUrl(filename);
  }

  async submit(): Promise<void> {
    try {
      const updatedTicket = await winningTicketResource.withdrawnTicket(
        this.winningTicket
      );

      this.$emit("input", updatedTicket);
    } catch (error) {
      console.error(error);
      this.$store.commit("eventStore/add", { name: "error" });
    }
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
