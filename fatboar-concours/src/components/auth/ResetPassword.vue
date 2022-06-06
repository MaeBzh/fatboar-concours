<template>
  <v-container>
    <v-card class="card" max-width="30em" :loading="loading">
      <template v-if="!hasBeenReset">
        <validation-observer ref="form" >
          <form @submit.prevent="submit">
            <v-card-title class="primary--text d-flex justify-center"
              >Réinitialiser votre mot de passe</v-card-title
            >
            <v-divider class="primary mb-8"></v-divider>
            <v-card-subtitle
              >Entrez votre nouveau mot de passe.</v-card-subtitle
            >
            <v-card-text>
              <validation-provider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
              >
                <v-text-field
                  v-model="resetPwdForm.email"
                  :error-messages="errors"
                  label="Adresse email"
                  required
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="password"
                :rules="{
                  required: true,
                  password:
                    '^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&?]).*$',
                }"
              >
                <v-text-field
                  v-model="resetPwdForm.password"
                  :error-messages="errors"
                  label="Mot de passe"
                  ref="password"
                  :type="showPassword ? 'text' : 'password'"
                >
                  <template slot="append">
                    <v-icon @click="togglePassword"
                      >{{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
                    </v-icon>
                  </template>
                </v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="passwordConfirm"
                rules="required|confirmed:password"
              >
                <v-text-field
                  v-model="resetPwdForm.passwordConfirm"
                  :error-messages="errors"
                  label="Confirmation du mot de passe"
                  :type="showPassword ? 'text' : 'password'"
                >
                  <template slot="append">
                    <v-icon @click="togglePassword"
                      >{{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
                    </v-icon>
                  </template>
                </v-text-field>
              </validation-provider>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-btn
                type="submit"
                :loading="loading"
                class="accent primary--text"
                >Envoyer</v-btn
              >
            </v-card-actions>
          </form>
        </validation-observer>
      </template>
      <template v-else>
        <v-card-title class="primary--text d-flex justify-center"
          >Réinitialiser votre mot de passe</v-card-title
        >
        <v-card-text>
          Votre mot de passe a été mis à jour, vous pouvez dés à présent vous
          connecter.
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
  public resetPwdForm = {
    email: "",
    password: "",
    passwordConfirm: "",
  };

  public showPassword = false;
  public hasBeenReset = false;

  get accountToken(): string | undefined {
    return this.$route.params.token;
  }

  async submit(): Promise<void> {
    const isValid = await this.form.validate();
    if (isValid) {
      try {
        this.loading = true;
        await this.$store.dispatch("authStore/resetPassword", {
          ...this.resetPwdForm,
          accountToken: this.accountToken,
        });
        this.hasBeenReset = true;
      } catch (error) {
        this.$store.commit("eventStore/add", {
          name: error.status === 404 ? "wrongCredentials" : "error",
        });
      } finally {
        this.loading = false;
      }
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
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
