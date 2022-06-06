<template>
  <v-container>
    <v-card
      width="80%"
      :loading="false"
      loader-height="4"
      class="card pa-8 mx-4"
    >
      <v-card-title> Ajouter un employé </v-card-title>
      <v-card-text>
        <validation-observer ref="form" >
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="firstname"
              rules="required|max:45"
            >
              <v-text-field
                v-model="employee.firstname"
                :error-messages="errors"
                label="Prénom"
                required
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
                required
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
                required
                outlined
              ></v-text-field>
            </validation-provider>

            <v-btn class="mx-4" outlined @click="reset">Réinitialiser</v-btn>
            <v-btn
              class="accent primary--text mr-4"
              type="submit"
              :disabled="loading"
            >
              Valider
            </v-btn>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { Component, Ref, Vue } from "vue-property-decorator";
import { ValidatorRef } from "@/types/validator";
import { Employee } from "@/models";

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class EmployeeCreate extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  public employee: Partial<Employee> = {
    firstname: "",
    lastname: "",
    email: "",
  };
  public loading = false;

  async submit(): Promise<void> {
    this.loading = true;

    const isValid = this.form.validate();

    if (isValid) {
      try {
        await this.$store.dispatch("employeeStore/create", this.employee);
        this.$store.commit("eventStore/add", {
          name: "entityCreated",
        });
        this.$router.push({
          name: "employees",
        });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      } finally {
        this.loading = false;
      }
    }
  }
  reset(): void {
    this.employee = { firstname: "", lastname: "", email: "" };
    this.form.reset();
  }
}
</script>
