<template>
  <v-container>
    <v-row justify="space-around">
      <v-card :width="isMobile ? '100%' : '70%'" :loading="loading">
        <div v-if="!winningTicket">
          <v-card-title class="accent--text primary d-flex justify-center">
            Vérifiez votre gain
          </v-card-title>
          <v-img
            height="40%"
            src="/assets/images/presentation-image.png"
            alt="Un hamburger et des frites posés sur une planche en bois"
          >
            <validation-observer ref="form">
              <form @submit.prevent="submit">
                <v-card-text class="d-flex flex-column align-center">
                  <validation-provider
                    v-slot="{ errors }"
                    name="number"
                    :rules="{
                      numeric: true,
                      required: true,
                    }"
                  >
                    <v-text-field
                      v-model="ticket.number"
                      :error-messages="errors"
                      label="Numéro gagnant"
                      color="primary"
                      :type="isMobile ? 'number' : 'text'"
                      :class="
                        isMobile
                          ? 'gift-field-mobile mb-4 px-2'
                          : 'gift-field mb-8 px-2'
                      "
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="amount"
                    :rules="{
                      regex: '[+-]?([0-9]*[,])?[0-9]+',
                      required: true,
                    }"
                  >
                    <v-text-field
                      v-model="ticket.amount"
                      :error-messages="errors"
                      label="Montant en € de votre ticket"
                      required
                      color="primary"
                      :type="isMobile ? 'number' : 'text'"
                      :class="
                        isMobile ? 'gift-field-mobile px-2' : 'gift-field px-2'
                      "
                    ></v-text-field>
                  </validation-provider>
                </v-card-text>
                <v-card-actions class="d-flex justify-center">
                  <v-btn type="submit" color="accent" class="primary--text"
                    >Vérifier</v-btn
                  >
                </v-card-actions>
                <v-divider class="mt-4 mb-4"></v-divider>
                <v-card-actions class="d-flex flex-column align-center">
                </v-card-actions>
              </form>
            </validation-observer>
          </v-img>
        </div>
        <show-gift v-else v-model="winningTicket" @input="resetTicket" />
        <game-history></game-history>
      </v-card>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { ValidatorRef } from "@/types/validator";
import { Component, Ref } from "vue-property-decorator";
import { WinningTicket } from "@/models";
import GameHistory from "@/components/client-screens/GameHistory.vue";
import ShowGift from "@/components/client-screens/ShowGift.vue";
import FileDownloadMixin from "@/mixins/file-download.mixin";
import { isMobile } from "@/helpers/utils";

@Component({
  components: {
    GameHistory,
    ShowGift,
  },
  metaInfo() {
    return {
      title: "Page du jeu-concours",
      content:
        "Formulaire pour entrer les numéros gagnants obtenus en restaurant. Possibilité de gagner de nombreux cadeaux : hamburger de gibier, entrées ou dessert, menu",
    };
  },
})
export default class Game extends FileDownloadMixin {
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public ticket = {
    number: "",
    amount: "",
  };
  public winningTicket: WinningTicket | null = null;

  get isMobile() {
    return isMobile();
  }

  get tickets() {
    return this.$store.getters["ticketStore/getAll"];
  }

  get giftImage(): string {
    const photo = this.winningTicket?.gift.photo;
    return photo ? this.getFileUrl(photo) : "";
  }

  resetTicket(): void {
    this.ticket = { number: "", amount: "" };
  }

  async submit(): Promise<void> {
    this.loading = true;

    const isValid = await this.form.validate();
    if (isValid) {
      try {
        const winningTicket = await this.$store.dispatch(
          "ticketStore/verifyTicket",
          this.ticket
        );

        if (winningTicket && !winningTicket.userId) {
          const user = this.$store.getters["authStore/getAuthUser"];
          const updatedTicket = {
            ...winningTicket,
            user,
          };
          await this.$store.dispatch("ticketStore/update", updatedTicket);
        }

        this.winningTicket = winningTicket;
      } catch (error) {
        if (error?.status === 404) {
          this.$store.commit("eventStore/add", { name: "badGameTicket" });
        } else if (error?.status === 429) {
          this.$store.commit("eventStore/add", { name: "throttle" });
        } else {
          this.$store.commit("eventStore/add", { name: "error" });
        }
      } finally {
        this.$store.dispatch("ticketStore/fetchAllTicketsForConnectedUser");
        this.loading = false;
      }
    }
  }

  mounted() {
    this.loading = true;
    this.$store
      .dispatch("ticketStore/fetchAllTicketsForConnectedUser")
      .finally(() => (this.loading = false));
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
  min-width: 500px;
}

.gift-field-mobile {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
