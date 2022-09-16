<template>
  <v-container>
    <v-card class="card" max-width="30em" :loading="loading">
      <validation-observer ref="form">
        <form @submit.prevent="submit">
          <v-card-title class="primary--text d-flex justify-center"
            >🔒 CONNEXION</v-card-title
          >
          <v-divider class="primary mb-8"></v-divider>
          <v-card-text>
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="login.email"
                :error-messages="errors"
                label="Adresse email"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="password"
              rules="required"
            >
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                v-model="login.password"
                :error-messages="errors"
                label="Mot de passe"
                required
              >
                <template slot="append">
                  <v-icon @click="togglePassword"
                    >{{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
                  </v-icon>
                </template></v-text-field
              >
            </validation-provider>

            <v-checkbox
              label="Se rappeler de moi"
              name="remember"
              color="accent"
              v-model="remember"
            >
            </v-checkbox>
            <v-card-text class="d-flex justify-center"
              ><router-link text :to="{ name: 'sendResetPassword' }"
                >Mot de passe oublié ?</router-link
              ></v-card-text
            >
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn type="submit" :loading="loading" class="accent primary--text"
              >Se connecter</v-btn
            >
          </v-card-actions>
          <v-card-text class="d-flex justify-center">ou</v-card-text>
          <v-card-actions class="d-flex flex-column align-center">
            <facebook-login class="ma-2" />
            <google-login-button class="ma-2" />
          </v-card-actions>
          <v-divider class="mt-4 mb-4"></v-divider>
          <v-card-text class="d-flex justify-center"
            >Pas encore de compte ?</v-card-text
          >
          <v-card-actions class="d-flex justify-center">
            <v-btn :to="{ name: 'register' }" class="accent primary--text"
              >Créer un compte</v-btn
            >
          </v-card-actions>
        </form>
      </validation-observer>
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
  public login = {
    email: "",
    password: "",
  };
  public remember = false;
  public showPassword = false;

  async submit(): Promise<void> {
    const isValid = await this.form.validate();
    if (isValid) {
      this.loading = true;
      try {
        if (this.remember) {
          this.$cookies.set(
            "remember",
            JSON.stringify({ login: this.login.email }),
            "3m"
          );
        }

        await this.$store.dispatch("authStore/logn", this.login);

        this.redirectIfAuthenticated();
      } catch (error) {
        if (error.status === 400 || error.status === 404) {
          if (error.message === "Account not activated") {
            this.$store.commit("eventStore/add", {
              name: "accountNotActivated",
            });
          } else {
            this.$store.commit("eventStore/add", {
              name: "wrongCredentials",
            });
          }
        } else {
          this.$store.commit("eventStore/add", { name: "error" });
        }
      } finally {
        this.loading = false;
      }
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  beforeMount() {
    this.redirectIfAuthenticated();
  }

  mounted(): void {
    const remember = this.$cookies.get("remember");
    if (remember) {
      this.login.email = remember.login;
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
