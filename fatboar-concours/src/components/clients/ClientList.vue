<template>
  <v-container>
    <item-list
      model="client"
      title="Liste des clients"
      :items="clients"
      :headers="headers"
      :loading="loading"
      :addBtn="false"
    >
      <template v-slot:[`item.newsletter`]="{ item }">
        {{ ouiNon(item.newsletter) }}
      </template>

      <template v-slot:[`item.sms`]="{ item }">
        {{ ouiNon(item.sms) }}
      </template>
    </item-list>
  </v-container>
</template>

<script lang="ts">
import { Client } from "@/models";
import { Component, Vue } from "vue-property-decorator";
import { OuiNon } from "@/helpers/utils";

@Component
export default class ClientList extends Vue {
  public loading = false;
  public ouiNon = OuiNon;

  get headers() {
    return [
      { text: "#", value: "id" },
      { text: "Nom", value: "fullname" },
      { text: "E-mail", value: "email" },
      { text: "Téléphone", value: "phone" },
      { text: "Année de naissance", value: "birthYear" },
      { text: "Newsletter", value: "newsletter" },
      { text: "SMS", value: "sms" },
    ];
  }

  get clients() {
    const clients = this.$store.getters["clientStore/getAll"];
    return clients.map((client: Client) => {
      return {
        ...client,
        fullname: `${client.firstname} ${client.lastname.toUpperCase()}`,
      };
    });
  }

  async mounted() {
    this.loading = true;
    await this.$store.dispatch("clientStore/fetchAll");
    this.loading = false;
  }
}
</script>
