<template>
  <v-container>
    <v-card
      :loading="loading"
      :class="['d-flex flex-column align-center', isMobile ? '' : 'pa-5']"
    >
      <v-card-title :class="isMobile ? 'card-title-mobile' : 'card-title pb-5'">
        Modifier vos informations
      </v-card-title>
      <v-card-text class="edit-form">
        <validation-observer ref="form" v-slot="{ invalid, dirty }">
          <form v-if="!!connectedUser" @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Firstname"
              rules="max:45"
            >
              <v-row class="justify-center">
                <v-text-field
                  v-model="connectedUser.firstname"
                  :error-messages="errors"
                  label="Prénom"
                  :disabled="disabled.firstname"
                ></v-text-field>
                <v-icon
                  elevation="2"
                  class="ml-4"
                  :color="getColor(disabled.firstname)"
                  @click="disabled.firstname = !disabled.firstname"
                  >{{ disabled.firstname ? "mdi-pencil" : "mdi-check-bold" }}
                </v-icon>
              </v-row>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="lastname"
              rules="max:45"
            >
              <v-row class="justify-center">
                <v-text-field
                  v-model="connectedUser.lastname"
                  :error-messages="errors"
                  :disabled="disabled.lastname"
                  label="Nom"
                ></v-text-field>
                <v-icon
                  elevation="2"
                  :color="getColor(disabled.lastname)"
                  @click="disabled.lastname = !disabled.lastname"
                  >{{
                    disabled.lastname ? "mdi-pencil" : "mdi-check-bold"
                  }}</v-icon
                >
              </v-row>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="email" rules="email">
              <v-row class="justify-center">
                <v-text-field
                  v-model="connectedUser.email"
                  :error-messages="errors"
                  :disabled="disabled.email"
                  label="Adresse e-mail"
                ></v-text-field>
                <v-icon
                  elevation="2"
                  :color="getColor(disabled.email)"
                  class="form-icon"
                  @click="disabled.email = !disabled.email"
                  >{{
                    disabled.email ? "mdi-pencil" : "mdi-check-bold"
                  }}</v-icon
                >
              </v-row>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="phone"
              :rules="{
                digits: 10,
                regex: '^(01|02|03|04|05|06|07|09)\\d{8}$',
              }"
            >
              <v-row class="justify-center">
                <v-text-field
                  v-model="connectedUser.phone"
                  :error-messages="errors"
                  :disabled="disabled.phone"
                  label="Téléphone"
                ></v-text-field>
                <v-icon
                  elevation="2"
                  :color="getColor(disabled.phone)"
                  @click="disabled.phone = !disabled.phone"
                  >{{
                    disabled.phone ? "mdi-pencil" : "mdi-check-bold"
                  }}</v-icon
                >
              </v-row>
            </validation-provider>

            <validation-provider v-slot="{ errors }" name="birthYear">
              <v-row v-if="disabled.birthYear" class="justify-center">
                <v-text-field
                  v-model="connectedUser.birthYear"
                  label="Anne de naissance"
                  :disabled="disabled.birthYear"
                  >{{ connectedUser.birthYear }}
                </v-text-field>
                <v-icon
                  elevation="2"
                  color="primary"
                  @click="disabled.birthYear = !disabled.birthYear"
                  >mdi-pencil</v-icon
                >
              </v-row>
              <v-row v-else>
                <v-menu
                  ref="refBirthYearMenu"
                  v-model="showDatePicker"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  :disabled="disabled.birthYear"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="connectedUser.birthYear"
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
                <v-icon
                  elevation="2"
                  class="col-1"
                  color="accent"
                  @click="disabled.birthYear = !disabled.birthYear"
                  >mdi-check-bold</v-icon
                >
              </v-row>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="zipcode"
              :rules="{
                digits: 5,
              }"
            >
              <v-row class="justify-center">
                <v-text-field
                  v-model="connectedUser.zipcode"
                  :error-messages="errors"
                  :disabled="disabled.zipcode"
                  label="Code postal"
                ></v-text-field>
                <v-icon
                  elevation="2"
                  :color="getColor(disabled.zipcode)"
                  @click="disabled.zipcode = !disabled.zipcode"
                  >{{
                    disabled.zipcode ? "mdi-pencil" : "mdi-check-bold"
                  }}</v-icon
                >
              </v-row>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="newsletter">
              <v-checkbox
                :checked="connectedUser.newsletter"
                :error-messages="errors"
                label="Abonné à la newsletter"
                color="accent"
                type="checkbox"
              ></v-checkbox>
            </validation-provider>

            <validation-provider v-slot="{ errors }" name="sms">
              <v-checkbox
                :checked="connectedUser.sms"
                :error-messages="errors"
                color="accent"
                label="Abonné aux notifications SMS"
                type="checkbox"
              ></v-checkbox>
            </validation-provider>
            <v-btn
              :class="isMobile ? 'ma-1' : 'ma-4'"
              outlined
              color="accent primary--text"
              @click="resetConnectedUser"
              :disabled="invalid || !dirty"
            >
              {{ isMobile ? "Annuler" : "Annuler les modifications" }}
            </v-btn>
            <v-btn
              :class="isMobile ? 'ma-1' : 'ma-4'"
              color="accent primary--text"
              type="submit"
              :disabled="invalid || !dirty"
            >
              {{ isMobile ? "Enregistrer" : "Enregistrer les modifications" }}
            </v-btn>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Client } from "@/models/client.model";
import { Component, Vue, Ref, Watch } from "vue-property-decorator";
import { ValidatorRef } from "@/types/validator";
import { DatePickerMenuRef, DatePickerRef } from "@/types/datePicker";
import { isMobile } from "@/helpers/utils";

@Component
export default class ProfileEdit extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  @Ref("refBirthYearPicker") refBirthYearPicker!: DatePickerRef;
  @Ref("refBirthYearMenu") refBirthYearMenu!: DatePickerMenuRef;
  public isMobile = isMobile;
  public loading = false;
  public showDatePicker = false;
  public connectedUser: Client | null = null;
  public disabled = {
    firstname: true,
    lastname: true,
    email: true,
    phone: true,
    zipcode: true,
    birthYear: true,
  };

  async submit() {
    this.loading = true;
    const isValid = await this.form.validate();
    if (isValid) {
      try {
        await this.$store
          .dispatch("clientStore/update", this.connectedUser)
          .then(() => {
            this.disabled = {
              firstname: true,
              lastname: true,
              email: true,
              phone: true,
              zipcode: true,
              birthYear: true,
            };
          });
        this.$store.commit("eventStore/add", {
          name: "profileUpdated",
        });
        localStorage.setItem(
          "connectedUser",
          JSON.stringify(this.connectedUser)
        );
        this.$store.commit("authStore/setAuthUser", this.connectedUser);
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      } finally {
        this.loading = false;
      }
    }
  }

  getColor(disabled: boolean): string {
    return disabled ? "primary" : "accent";
  }

  onClickYear(year: string): void {
    this.refBirthYearMenu.save(year);
    if (this.connectedUser) {
      this.connectedUser.birthYear = +year;
    }
    this.showDatePicker = false;
  }

  resetConnectedUser(): void {
    this.connectedUser = JSON.parse(
      this.$store.getters["authStore/getAuthUser"]
    );
  }

  @Watch("showDatePicker")
  onShowDatePickerChange(isOpen: boolean) {
    if (isOpen) {
      this.$nextTick(() => {
        this.refBirthYearPicker.internalActivePicker = "YEAR";
      });
    }
  }

  mounted() {
    this.loading = true;
    this.connectedUser = this.$store.getters["authStore/getAuthUser"];
    this.loading = false;
  }
}
</script>
<style scoped>
.edit-form {
  max-width: 80%;
}
</style>
