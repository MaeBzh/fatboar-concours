<template>
  <v-container>
    <v-card :loading="loading" class="pa-8">
      <v-card-title>Ajouter une caisse enregistreuse</v-card-title>
      <v-card-text>
        <validation-observer ref="form" >
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="serial"
              rules="required|max:15"
            >
              <v-text-field
                v-model="cashRegister.serial"
                :error-messages="errors"
                label="Serial"
                required
                outlined
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="restaurant"
              rules="required"
            >
              <v-select
                :value="restaurant"
                :items="restaurants"
                :error-messages="errors"
                label="Restaurant"
                required
                outlined
                @input="cashRegister.restaurantId = $event.id"
              >
                <template #item="{ item }">
                  <p>{{ item.name }} - {{ item.city }}</p>
                </template>

                <template #selection="{ item }">
                  <p>{{ item.name }} - {{ item.city }}</p>
                </template>
              </v-select>
            </validation-provider>

            <v-card-actions>
              <v-btn class="mx-4 primary--text" outlined @click="reset"
                >Réinitialiser</v-btn
              >
              <v-btn
                class="mx-4 accent primary--text"
                type="submit"
                :loading="loading"
              >
                Sauvegarder
              </v-btn>
            </v-card-actions>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { CashRegister, Restaurant } from "@/models";
import { ValidatorRef } from "@/types/validator";
import { Component, Ref, Vue } from "vue-property-decorator";
import { v4 as uuidv4 } from "uuid";

@Component
export default class CashRegisterCreate extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public cashRegister: Partial<CashRegister> = {
    serial: "",
    token: undefined,
    restaurantId: undefined,
  };

  async submit(): Promise<void> {
    this.loading = true;
    this.cashRegister.token = uuidv4();

    const isValid = await this.form.validate();
    if (isValid) {
      try {
        await this.$store.dispatch(
          "cashRegisterStore/create",
          this.cashRegister
        );
        this.$store.commit("eventStore/add", {
          name: "entityCreated",
        });
        this.$router.push({ name: "cashRegisters" });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      }
    }
    this.loading = false;
  }

  reset(): void {
    this.cashRegister = { serial: "", restaurantId: undefined };
    this.form.reset();
  }

  get restaurants(): Restaurant[] {
    return this.$store.getters["restaurantStore/getAll"];
  }

  get restaurant(): Restaurant | null {
    if (this.cashRegister.restaurantId) {
      return this.$store.getters["restaurantStore/getOne"](
        this.cashRegister.restaurantId
      );
    }
    return null;
  }

  mounted(): void {
    this.loading = true;
    this.$store
      .dispatch("restaurantStore/fetchAll")
      .finally(() => (this.loading = false));
  }
}
</script>
