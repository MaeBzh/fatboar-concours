<template>
  <v-container>
    <v-card width="80%" loading="true" loader-height="4" class="pa-8">
      <v-card-title> Ajouter un restaurant </v-card-title>
      <v-card-text>
        <validation-observer ref="form">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="name"
              rules="required|max:45"
            >
              <v-text-field
                v-model="restaurant.name"
                :error-messages="errors"
                label="Nom"
                required
                outlined
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="city"
              rules="required|max:45"
            >
              <v-text-field
                v-model="restaurant.city"
                :error-messages="errors"
                label="Ville"
                required
                outlined
              ></v-text-field>
            </validation-provider>
            <v-btn @click="reset" class="mx-4 primary--text">
              Réinitialiser
            </v-btn>
            <v-btn
              class="mx-4 accent primary--text"
              type="submit"
              :loading="loading"
            >
              Sauvegarder
            </v-btn>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Restaurant } from "@/models";
import { ValidatorRef } from "@/types/validator";
import { Component, Ref, Vue } from "vue-property-decorator";

@Component
export default class RestaurantCreate extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public restaurant: Partial<Restaurant> = {
    name: "",
    city: "",
  };

  async submit(): Promise<void> {
    this.loading = true;

    const isValid = await this.form.validate();
    if (isValid) {
      try {
        await this.$store.dispatch("restaurantStore/create", this.restaurant);
        this.$store.commit("eventStore/add", {
          name: "entityCreated",
        });
        this.$router.push({ name: "restaurants" });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      } finally {
        this.loading = false;
      }
    }
  }

  reset(): void {
    this.restaurant = { name: "", city: "" };
    this.form.reset();
  }
}
</script>
