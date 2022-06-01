<template>
  <v-container>
    <item-list
      model="emailingList"
      title="Liste de diffusion"
      :items="emailingLists"
      :headers="headers"
      :loading="loading"
      :exportBtn="true"
      :edit-btn="false"
      @export="exportCsv"
    >
      <template v-slot:[`item.nbClients`]="{ item }">
        <v-tooltip bottom max-width="300px" color="grey">
          <template v-slot:activator="{ on, attrs }">
            <span>{{ item.nbClients }}</span>
            <v-icon v-bind="attrs" v-on="on" class="ml-2">mdi-eye</v-icon>
          </template>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                v-for="(item, i) in getClientsOfTheList(item)"
                :key="i"
              >
                {{ item }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-tooltip>
      </template>
    </item-list>
  </v-container>
</template>
<script lang="ts">
import { formatDate, convertToCSV } from "@/helpers/utils";
import { EmailingList } from "@/models";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EmailingListlist extends Vue {
  public loading = false;
  public convertToCSV = convertToCSV;

  get headers() {
    return [
      { text: "#", value: "id", width: "50px" },
      { text: "Nom", value: "name", width: "300px" },
      { text: "Nb de clients", value: "nbClients", width: "100px" },
      { text: "Filtres", value: "filtres" },
    ];
  }

  get emailingLists() {
    const emailingLists = this.$store.getters["emailingListStore/getAll"];
    return emailingLists.map((emailingList: EmailingList) => ({
      ...emailingList,
      nbClients: emailingList.users.length,
      filtres: this.displayFilters(emailingList.filters),
    }));
  }

  exportCsv(item) {
    const users = item.users.map((user) => {
      return {
        prénom: user.firstname,
        nom: user.lastname,
        email: user.email,
      };
    });

    const headers = ["prénom", "nom", "email"];
    const csv = this.convertToCSV(users, headers);
    const date = formatDate(new Date(), "P");
    const csvName = `emailing-list-${date}.csv`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", csvName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  public displayFilters(filters: string) {
    const filtersJson = JSON.parse(filters);
    let ageFilters = "";
    if (filtersJson.years) {
      ageFilters += "Année de naissance :";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.values(filtersJson.years).forEach((value: any) => {
        ageFilters += ` entre ${value["min"]} et ${value["max"]}, `;
      });
    }
    const departmentFilters = filtersJson.departments
      ? `Départements : ${filtersJson.departments}`
      : "";
    return `${ageFilters}; ${departmentFilters}`;
  }

  public getClientsOfTheList(list: EmailingList) {
    const clients = this.$store.getters[
      "emailingListStore/getClientsOfTheList"
    ](list.id);
    return clients;
  }

  async mounted() {
    this.loading = true;
    await this.$store.dispatch("emailingListStore/fetchAll");
    this.loading = false;
  }
}
</script>
