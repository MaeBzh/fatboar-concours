<template>
  <v-container>
    <v-card :loading="loading">
      <v-card-title> Modifier cet employé </v-card-title>
      <v-card-text>
        <validation-observer ref="form" >
          <form v-if="!!employee" @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Firstname"
              rules="required|max:45"
            >
              <v-text-field
                v-model="employee.firstname"
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
                v-model="employee.lastname"
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
                v-model="employee.email"
                :error-messages="errors"
                label="Adresse e-mail"
                outlined
              ></v-text-field>
            </validation-provider>

            <v-btn color="primary" outlined @click="$router.back()">
              Annuler et retour
            </v-btn>
            <v-btn
              class="ma-4"
              color="accent primary--text"
              type="submit"
              :disabled="loading"
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
import { Component, Vue, Ref } from "vue-property-decorator";
import { ValidatorRef } from "@/types/validator";
import { Employee } from "@/models";

@Component
export default class EmployeeEdit extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public employee: Employee | null = null;

  async submit() {
    this.loading = true;
    const isValid = await this.form.validate();
    if (isValid) {
      try {
        await this.$store.dispatch("employeeStore/update", this.employee);
        this.$store.commit("eventStore/add", {
          name: "entityUpdated",
        });
        this.$router.push({ name: "employees" });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      } finally {
        this.loading = false;
      }
    }
  }

  async mounted() {
    this.loading = true;
    const employeeId = +this.$route.params.id;
    this.employee = await this.$store.dispatch(
      "employeeStore/fetchOne",
      employeeId
    );
    this.loading = false;
  }
}
</script>
