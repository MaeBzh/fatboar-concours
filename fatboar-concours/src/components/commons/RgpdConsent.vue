<template>
  <div>
    <v-container v-if="!hasRgpdConsent">
      <v-card class="pa-8 d-flex flex-column align-center">
        <v-card-title class="card-title pb-8">
          Utilisation de vos données personnelles
        </v-card-title>
        <v-card-subtitle
          >Pour continuer d'utiliser les services du site fatboar-concours.com,
          vous devez renouveler votre consentement quant à l'utilisation qui est
          faite de vos données personnelles. Vous pouvez à tout moment consulter
          notre <router-link :to="{ name: 'data' }">charte</router-link>
        </v-card-subtitle>
        <v-card-text class="edit-form">
          <form v-if="!!connectedUser" @submit.prevent="submit">
            <v-checkbox
              label="Les informations recueillies vous concernant servent uniquement à la gestion du fichier client interne à l'entreprise Fatboar
Vous bénéficiez d’un droit d’accès, de rectification, de portabilité, d’effacement de celles-ci ou une limitation du traitement.
Vous pouvez vous opposer au traitement des données vous concernant et disposez du droit de retirer votre consentement à tout moment en nous en faisant la demande via notre formualire de contact"
              color="accent"
              type="checkbox"
              required
            ></v-checkbox>
            <v-btn class="ma-4" color="accent primary--text" type="submit" :loading="loading">
              Enregistrer
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-container>
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { ValidatorRef } from "@/types/validator";
import { isBefore, sub } from "date-fns";
import { Vue, Component, Ref } from "vue-property-decorator";

@Component
export default class RgpdConsent extends Vue {
  @Ref("form") readonly form!: ValidatorRef;

  get connectedUser() {
    return this.$store.getters["authStore/getAuthUser"];
  }

  get hasRgpdConsent() {
    if (
      this.connectedUser?.role.name === "client" &&
      this.$route.meta?.rgpdConsent
    ) {
      const outdatedRgpd = isBefore(
        new Date(this.connectedUser.rgpdConsent),
        sub(new Date(), { days: 365 })
      );
      return !outdatedRgpd;
    }

    return true;
  }

  async submit() {
    try {
      const updatedAuthUser = {
        ...this.connectedUser,
        rgpdConsent: new Date(Date.now()),
      };
      await this.$store.dispatch(
        "clientStore/updateRgpdConsent",
        updatedAuthUser
      );

      // update local data of authUser
      this.$store.commit("authStore/setAuthUser", updatedAuthUser);
      this.$store.commit("eventStore/add", { name: "rgpdAccepted" });
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 80%;
}
</style>
