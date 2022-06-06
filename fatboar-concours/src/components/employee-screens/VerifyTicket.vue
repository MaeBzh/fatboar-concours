<template>
  <v-container class="d-flex justify-center">
    <v-card
      :width="isMobile ? '100 %' : '60%'"
      loading="true"
      loader-height="4"
      class="pa-8"
    >
      <div v-if="!winningTicket">
        <v-card-title> Vérifier un gain </v-card-title>
        <v-card-text>
          <validation-observer ref="form">
            <form @submit.prevent="submit">
              <validation-provider
                v-slot="{ errors }"
                name="number"
                :rules="{
                  regex: '^[0-9]+$',
                  required: true,
                }"
              >
                <v-text-field
                  v-model="ticket.number"
                  :error-messages="errors"
                  label="Numéro gagnant"
                  color="primary"
                  class="gift-field mb-8 px-2"
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="amount"
                rules="required"
              >
                <v-text-field
                  v-model="ticket.amount"
                  :error-messages="errors"
                  label="Montant en € du ticket"
                  required
                  color="primary"
                  class="gift-field px-2"
                ></v-text-field>
              </validation-provider>
              <v-btn
                class="mx-4 accent primary--text"
                type="submit"
                :loading="loading"
              >
                Vérifier le gain
              </v-btn>
            </form>
          </validation-observer>
        </v-card-text>
      </div>
      <withdrawn-gift v-else v-model="winningTicket" @reset="resetTicket" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { WinningTicket } from "@/models";
import { ValidatorRef } from "@/types/validator";
import { Component, Ref, Vue } from "vue-property-decorator";
import WithdrawnGift from "@/components/employee-screens/WithdrawnGift.vue";
import { isMobile } from "@/helpers/utils";

@Component({
  components: {
    WithdrawnGift,
  },
})
export default class RestaurantCreate extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public ticket = {
    number: "",
    amount: "",
  };
  public winningTicket: WinningTicket | null = null;

  async submit(): Promise<void> {
    const isValid = await this.form.validate();
    if (isValid) {
      try {
        this.loading = true;
        this.winningTicket = await this.$store.dispatch(
          "ticketStore/verifyTicket",
          this.ticket
        );
      } catch (error) {
        if (error?.status === 404) {
          this.$store.commit("eventStore/add", { name: "verifyBadTicket" });
        } else if (error?.status === 429) {
          this.$store.commit("eventStore/add", { name: "throttle" });
        } else {
          this.$store.commit("eventStore/add", { name: "error" });
        }
      } finally {
        this.loading = false;
      }
    }
  }

  get isMobile() {
    return isMobile();
  }

  resetTicket(): void {
    this.ticket = { number: "", amount: "" };
    this.winningTicket = null;
  }
}
</script>
