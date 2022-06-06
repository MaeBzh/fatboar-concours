<template>
  <v-container>
    <v-card class="card" max-width="50em" :loading="loading">
      <v-card-title class="primary--text card-title">Inscription</v-card-title>
      <v-card-text>
        <validation-observer ref="form" >
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="firstname"
              rules="required"
            >
              <v-text-field
                v-model="client.firstname"
                :error-messages="errors"
                label="Prénom"
                autofocus
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="lastname"
              rules="required"
            >
              <v-text-field
                v-model="client.lastname"
                :error-messages="errors"
                label="Nom"
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="client.email"
                :error-messages="errors"
                label="Adresse email"
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="zipcode"
              :rules="{
                digits: 5,
                required: true,
              }"
            >
              <v-text-field
                v-model="client.zipCode"
                :error-messages="errors"
                label="Code postal"
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="birthYear"
              rules="required"
            >
              <v-menu
                ref="refBirthYearMenu"
                v-model="showDatePicker"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="client.birthYear"
                    label="Année de naissance"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="refBirthYearPicker"
                  :error-messages="errors"
                  label="Année de naissance"
                  :max="new Date(Date.now()).toISOString()"
                  min="1900-01-01"
                  no-title
                  @click:year="onClickYear"
                >
                </v-date-picker>
              </v-menu>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="password"
              :rules="{
                required: true,
                password:
                  '(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*',
              }"
            >
              <v-text-field
                v-model="client.password"
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
                v-model="passwordConfirm"
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
            <validation-provider>
              <v-checkbox
                label="Je m'inscris à la newsletter"
                name="newsletter"
                v-model="client.newsletter"
              >
              </v-checkbox>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="sms"
              rules="required"
            >
              <v-checkbox
                :error-messages="errors"
                label="J'accepte de recevoir des notifications par SMS"
                name="sms"
                v-model="client.sms"
              >
              </v-checkbox>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="rgpdConsent"
              rules="rgpd"
              immediate
            >
              <v-checkbox
                v-model="rgpd"
                :error-messages="errors"
                name="rgpdConsent"
                @change="setRgpdDate"
              >
                <template v-slot:label>
                  <span
                    >Pour créer un compte, veuillez lire et accepter notre
                    <a href="" @click.stop="goToRgpd"
                      >politique de confidentialité</a
                    >
                    concernant les données personnelles</span
                  >
                </template></v-checkbox
              >
            </validation-provider>

            <v-card-actions class="d-flex justify-center">
              <v-btn class="accent primary--text" type="submit" :disabled="loading"
                >Enregistrer</v-btn
              >
            </v-card-actions>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { ValidatorRef } from "@/types/validator";
import { Component, Ref, Vue, Watch } from "vue-property-decorator";
import { DatePickerMenuRef, DatePickerRef } from "@/types/datePicker";

@Component
export default class Register extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  @Ref("refBirthYearPicker") refBirthYearPicker!: DatePickerRef;
  @Ref("refBirthYearMenu") refBirthYearMenu!: DatePickerMenuRef;
  public client = {
    firstname: "",
    lastname: "",
    birthYear: 0,
    zipCode: "",
    phone: "",
    newsletter: false,
    sms: false,
    email: "",
    password: "",
    rgpdConsent: new Date(0),
  };
  public rgpd = null;
  public loading = false;
  public showDatePicker = false;
  public password = "";
  public passwordConfirm = "";
  public showPassword = false;

  async submit(): Promise<void> {
    debugger;
    const isValid = await this.form.validate();

    if (this.rgpd) {
      this.client.rgpdConsent = new Date(Date.now());
    }

    if (isValid) {
      try {
        this.loading = true;
        await this.$store.dispatch("authStore/register", this.client);
        const ok = this.$store.commit("eventStore/add", {
          name: "userCreated",
        });
        this.$router.push({ name: "home" });
      } catch (e) {
        this.$store.commit("eventStore/add", { name: "error" });
      } finally {
        this.loading = false;
      }
    }
  }

  setRgpdDate(): void {
    this.client.rgpdConsent = this.rgpd ? new Date(Date.now()) : new Date(0);
  }

  goToRgpd(): void {
    this.$router.push({ name: "personalData" });
  }

  onClickYear(year: string): void {
    this.refBirthYearMenu.save(year);
    if (this.client) {
      this.client.birthYear = +year;
    }
    this.showDatePicker = false;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  @Watch("showDatePicker")
  onShowDatePickerChange(isOpen: boolean) {
    if (isOpen) {
      this.$nextTick(() => {
        this.refBirthYearPicker.internalActivePicker = "YEAR";
      });
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
