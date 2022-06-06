<template>
  <v-container>
    <v-card :loading="loading" class="pa-8" width="80%">
      <v-card-title> Modifier ce restaurant </v-card-title>
      <validation-observer ref="form">
        <form v-if="!!restaurant" @submit.prevent="submit">
          <v-card-text>
            <validation-provider
              v-slot="{ errors }"
              name="name"
              rules="required|max:15"
            >
              <v-text-field
                v-model="restaurant.name"
                :error-messages="errors"
                label="Nom"
                outlined
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="city"
              rules="required"
            >
              <v-text-field
                v-model="restaurant.city"
                :error-messages="errors"
                label="Ville"
                outlined
              ></v-text-field>
            </validation-provider>
          </v-card-text>

          <v-card-actions>
            <v-btn
              class="mx-4 primary--text"
              type="button"
              outlined
              @click="$router.back()"
            >
              Annuler et retour
            </v-btn>
            <v-btn
              class="mx-4 accent primary--text"
              type="submit"
              :loading="loading"
            >
              Enregistrer les modifications
            </v-btn>
          </v-card-actions>
        </form>
      </validation-observer>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Restaurant } from "@/models";
import { ValidatorRef } from "@/types/validator";
import { Component, Ref, Vue } from "vue-property-decorator";

@Component
export default class RestaurantEdit extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public restaurant: Restaurant | null = null;

  async submit(): Promise<void> {
    this.loading = true;
    const isValid = await this.form.validate();
    ({ cr: this.restaurant });
    if (isValid) {
      try {
        await this.$store.dispatch("restaurantStore/update", this.restaurant);
        this.$store.commit("eventStore/add", {
          name: "entityUpdated",
        });
        this.$router.push({ name: "restaurants" });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      }
    }
    this.loading = false;
  }

  async mounted() {
    this.loading = true;
    const restaurantId = +this.$route.params.id;
    this.restaurant = (await this.$store.dispatch(
      "restaurantStore/fetchOne",
      restaurantId
    )) as Restaurant;

    this.loading = false;
  }
}
</script>
