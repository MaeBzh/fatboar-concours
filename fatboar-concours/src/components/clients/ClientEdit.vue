<template>
  <v-container>
    <v-card :loading="loading" class="pa-8">
      <v-card-title> Modifier ce client </v-card-title>
      <v-card-text>
        <validation-observer ref="form" v-slot="{ invalid }">
          <form v-if="!!client" @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Firstname"
              rules="required|max:45"
            >
              <v-text-field
                v-model="client.firstname"
                :error-messages="errors"
                label="Prénom"
                outlined
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="lastname"
              rules="required|max:45"
            >
              <v-text-field
                v-model="client.lastname"
                :error-messages="errors"
                label="Nom"
                outlined
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
                label="Adresse e-mail"
                outlined
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="phone"
              :rules="{
                digits: 10,
                regex: '^(01|02|03|04|05|06|07|09)\\d{8}$',
              }"
            >
              <v-text-field
                v-model="client.phone"
                :error-messages="errors"
                label="Téléphone"
                outlined
              ></v-text-field>
            </validation-provider>

            <validation-provider v-slot="{ errors }" name="birthYear">
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
              name="zipcode"
              :rules="{
                digits: 5,
              }"
            >
              <v-text-field
                v-model="client.zipcode"
                :error-messages="errors"
                label="Code postal"
              ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="newsletter">
              <v-checkbox
                v-model="client.newsletter"
                :error-messages="errors"
                label="Abonné à la newsletter"
                type="checkbox"
              ></v-checkbox>
            </validation-provider>

            <validation-provider v-slot="{ errors }" name="sms">
              <v-checkbox
                v-model="client.sms"
                :error-messages="errors"
                label="Abonné aux notifications SMS"
                type="checkbox"
              ></v-checkbox>
            </validation-provider>

            <v-btn color="primary--text" outlined @click="$router.back()">
              Annuler et retour
            </v-btn>
            <v-btn
              class="ma-4"
              color="primary--text accent"
              type="submit"
              :disabled="invalid"
            >
              Enregistrer les modifications
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

@Component
export default class ClientEdit extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  @Ref("refBirthYearPicker") refBirthYearPicker!: DatePickerRef;
  @Ref("refBirthYearMenu") refBirthYearMenu!: DatePickerMenuRef;
  public loading = false;
  public showDatePicker = false;
  public client: Client | null = null;

  async submit() {
    this.loading = true;
    const isValid = await this.form.validate();
    if (isValid) {
      try {
        await this.$store.dispatch("clientStore/update", this.client);
        this.$store.commit("eventStore/add", {
          name: "entityUpdated",
        });
        this.$router.push({ name: "clients" });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      } finally {
        this.loading = false;
      }
    }
  }

  onClickYear(year: string): void {
    this.refBirthYearMenu.save(year);
    if (this.client) {
      this.client.birthYear = +year;
    }
    this.showDatePicker = false;
  }

  @Watch("showDatePicker")
  onShowDatePickerChange(isOpen: boolean) {
    if (isOpen) {
      this.$nextTick(() => {
        this.refBirthYearPicker.internalActivePicker = "YEAR";
      });
    }
  }

  async mounted() {
    this.loading = true;
    const clientId = +this.$route.params.id;
    this.client = await this.$store.dispatch("clientStore/fetchOne", clientId);
    this.loading = false;
  }
}
</script>
