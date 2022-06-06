<template>
  <v-container>
    <v-card class="card" max-width="30em" :loading="loading">
      <template v-if="!hasBeenSent">
        <validation-observer ref="form" v-slot="{ invalid, validated }">
          <v-card-title class="primary--text d-flex justify-center"
            >Réinitialiser votre mot de passe</v-card-title
          >
          <v-divider class="primary mb-8"></v-divider>
          <v-card-subtitle
            >Entrez l'adresse mail avec laquelle vous avez créer votre compte
            pour recevoir un lien de réinitialisation.</v-card-subtitle
          >
          <v-card-text>
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="Adresse email"
                required
              ></v-text-field>
            </validation-provider>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              type="submit"
              :disabled="(invalid && validated) || loading"
              class="accent primary--text"
              >Envoyer</v-btn
            >
          </v-card-actions>
        </validation-observer>
      </template>
      <template v-else>
        <v-card-title class="primary--text d-flex justify-center"
          >Réinitialiser votre mot de passe</v-card-title
        >
        <v-card-text>
          Un email avec un lien de réinitialisation vous a été envoyé sur la
          boîte mail {{ email }}.
        </v-card-text>
      </template>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import RedirectIfAuthenticatedMixin from "@/mixins/redirect-if-authenticated.mixin";
import FacebookLogin from "./FacebookLogin.vue";
import GoogleLoginButton from "./GoogleLogin.vue";
import { ValidatorRef } from "@/types/validator";

@Component({
  components: { FacebookLogin, GoogleLoginButton },
})
export default class Login extends RedirectIfAuthenticatedMixin {
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public email = "";
  public hasBeenSent = false;

  async submit(): Promise<void> {
    const isValid = await this.form.validate();
    if (isValid) {
      try {
        this.loading = true;
        await this.$store.dispatch("authStore/sendResetPassword", this.email);
        this.hasBeenSent = true;
      } catch (error) {
        this.$store.commit("eventStore/add", {
          name: error.status === 404 ? "wrongCredentials" : "error",
        });
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.card {
  margin: 2em auto;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-items: center;
}
</style>
