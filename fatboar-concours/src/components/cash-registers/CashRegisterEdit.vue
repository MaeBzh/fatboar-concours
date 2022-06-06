<template>
  <v-container>
    <v-card :loading="loading" class="pa-8" width="80%">
      <v-card-title> Modifier cette caisse enregistreuse </v-card-title>
      <validation-observer ref="form" >
        <form v-if="!!cashRegister" @submit.prevent="submit">
          <v-card-text>
            <validation-provider
              v-slot="{ errors }"
              name="serial"
              rules="required|max:15"
            >
              <v-text-field
                v-model="cashRegister.serial"
                :error-messages="errors"
                label="Numéro de caisse"
                outlined
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="token"
              rules="required"
            >
              <v-text-field
                append-outer-icon="mdi-pencil"
                v-model="cashRegister.token"
                :error-messages="errors"
                label="Token API"
                readonly
                outlined
                @click:append-outer="replaceToken()"
              ></v-text-field>
              <confirm ref="confirmReplaceToken" />
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="restaurant"
              rules="required"
            >
              <v-select
                v-model="cashRegister.restaurant"
                :items="restaurants"
                item-text="name"
                item-value="id"
                outlined
                :error-messages="errors"
                label="Restaurant"
              >
                <template #item="{ item }">
                  <p>
                    {{ item.name }} -
                    <small class="text--secondary">{{ item.city }}</small>
                  </p>
                </template>

                <template #selection="{ item }">
                  <p>
                    {{ item.name }} -
                    <small class="text--primary">{{ item.city }}</small>
                  </p>
                </template>
              </v-select>
            </validation-provider>
          </v-card-text>

          <v-card-actions>
            <v-btn
              class="mx-4 primary--text"
              outlined
              type="button"
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
import { v4 as uuidv4 } from "uuid";
import { CashRegister } from "@/models";
import { ValidatorRef } from "@/types/validator";
import { ConfirmRef } from "@/types/confirm";
import { Component, Ref, Vue } from "vue-property-decorator";

@Component
export default class CashRegisterEdit extends Vue {
  @Ref("confirmReplaceToken") readonly confirmReplaceToken!: ConfirmRef;
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public cashRegister: CashRegister | null = null;

  async submit(): Promise<void> {
    this.loading = true;
    const isValid = await this.form.validate();
    if (isValid) {
      try {
        await this.$store.dispatch(
          "cashRegisterStore/update",
          this.cashRegister
        );
        this.$store.commit("eventStore/add", { name: "entityUpdated" });
        this.$store.commit("eventStore/add", {
          name: "entityUpdated",
        });
        this.$router.push({ name: "cashRegisters" });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      }
    }
    this.loading = false;
  }

  get restaurants() {
    return this.$store.getters["restaurantStore/getAll"];
  }

  async replaceToken() {
    if (this.cashRegister) {
      const confirmed = await this.confirmReplaceToken.open({
        title: "Confirmer",
        message:
          "Le remplacement du token API necessitera une mise à jour de la caisse enregistreuse. Etes-vous sur de vouloir remplacer le token API ?",
      });
      if (confirmed) {
        this.cashRegister.token = uuidv4();
      }
    }
  }

  async mounted() {
    this.loading = true;
    const cashRegisterId = +this.$route.params.id;
    this.cashRegister = (await this.$store.dispatch(
      "cashRegisterStore/fetchOne",
      cashRegisterId
    )) as CashRegister;

    await this.$store.dispatch("restaurantStore/fetchAll");
    this.loading = false;
  }
}
</script>
