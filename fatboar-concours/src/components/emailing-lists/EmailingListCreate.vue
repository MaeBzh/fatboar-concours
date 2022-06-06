<template>
  <v-container>
    <v-card width="80%" loading="true" loader-height="4" class="pa-8">
      <v-card-title> Créer une nouvelle liste de diffusion </v-card-title>
      <v-card-text>
        <validation-observer ref="form">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="name"
              rules="required|max:45"
            >
              <v-text-field
                v-model="name"
                :error-messages="errors"
                label="Nom"
                required
                outlined
              ></v-text-field>
            </validation-provider>

            <v-card-subtitle class="primary--text">
              Filtrer les clients à ajouter à la liste (par défaut, tous les
              clients sont sélectionnés)
            </v-card-subtitle>

            <validation-provider v-slot="{ errors }" name="ageFilter">
              <v-row align="center" class="mx-4">
                <v-select
                  v-model="filters.years"
                  :items="ages"
                  multiple
                  outlined
                  item-text="name"
                  item-value="years"
                  :error-messages="errors"
                  label="Filtrer par tranches d'âges"
                >
                </v-select>
              </v-row>
            </validation-provider>

            <validation-provider v-slot="{ errors }" name="departmentFilter">
              <v-row align="center" class="mb-4 mx-4">
                <v-select
                  v-model="filters.departments"
                  :items="departments"
                  multiple
                  item-text="fullname"
                  item-value="code"
                  outlined
                  :error-messages="errors"
                  label="Filtrer par départments"
                >
                </v-select>
              </v-row>
            </validation-provider>

            <v-alert
              border="left"
              colored-border
              color="accent"
              elevation="2"
              class="ma-4"
            >
              Il y a actuellement {{ clientsCount }} clients dans votre liste de
              diffusion
            </v-alert>

            <v-btn @click="reset" outlined class="ma-4 primary--text">
              Réinitialiser
            </v-btn>
            <v-btn
              class="ma-4 accent primary--text"
              type="submit"
              :loading="loading"
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
import { Client } from "@/models/client.model";
import { Component, Ref, Vue } from "vue-property-decorator";
import { Department } from "@/types/department";
import { Age } from "@/types/age";
import { ValidatorRef } from "@/types/validator";

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class EmailingListCreate extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  public name = "";
  public filters = {
    departments: [] as string[],
    years: [] as { min: number; max: number }[],
  };

  public async submit(): Promise<void> {
    const isValid = this.form.validate();
    const newList = {
      name: this.name,
      userIds: this.clientsFiltered.map((client) => client.id),
      filters: JSON.stringify(this.filters),
    };
    if (isValid && this.clientsFiltered.length) {
      try {
        this.$store.dispatch("emailingListStore/create", newList);
        this.$store.commit("eventStore/add", {
          name: "entityCreated",
        });
        this.$router.push({ name: "emailingListList" });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      }
    }
  }

  public reset(): void {
    this.name = "";
    this.filters.departments = [];
    this.filters.years = [];
    this.form.reset();
  }

  get departments(): Promise<Department[]> {
    const departments = this.$store.getters["emailingListStore/getDepartments"];
    return departments.map((department: Department) => ({
      ...department,
      fullname: `${department.nom} (${department.code})`,
    }));
  }

  get clients(): Client[] {
    return this.$store.getters["clientStore/getAll"];
  }

  get ages(): Age[] {
    return [
      {
        name: "18-34",
        years: {
          min: new Date().getFullYear() - 18,
          max: new Date().getFullYear() - 34,
        },
      },
      {
        name: "35-59",
        years: {
          min: new Date().getFullYear() - 35,
          max: new Date().getFullYear() - 59,
        },
      },
      {
        name: "plus de 60",
        years: {
          min: new Date().getFullYear() - 60,
          max: new Date().getFullYear() - 100,
        },
      },
    ];
  }

  get clientsCount() {
    return this.clientsFiltered.length;
  }

  get clientsFiltered(): Client[] {
    let clients: Client[] = this.clients;

    if (this.filters.departments.length) {
      clients = this.clients.filter(({ zipcode }) => {
        return this.filters.departments.includes(zipcode.substring(0, 2));
      });
    }

    if (this.filters.years.length) {
      clients = clients.filter(({ birthYear }) => {
        let keepClient = false;
        this.filters.years.forEach(({ min, max }) => {
          if (min >= birthYear && max <= birthYear) {
            keepClient = true;
          }
        });
        return keepClient;
      });
    }

    return clients;
  }

  mounted() {
    this.$store.dispatch("emailingListStore/fetchDepartments");
    this.$store.dispatch("clientStore/fetchAll");
  }
}
</script>
