<template>
  <v-container>
    <item-list
      model="cashRegister"
      title="Liste des caisses enregistreuses"
      :headers="headers"
      :loading="loading"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CashRegisterList extends Vue {
  public loading = false;

  get headers() {
    return [
      { text: "#", value: "id" },
      { text: "Serial", value: "serial" },
      { text: "API Token", value: "token" },
      { text: "Restaurant", value: "restaurant.name" },
      { text: "City", value: "restaurant.city" },
    ];
  }

  mounted(): void {
    this.loading = true;
    this.$store
      .dispatch("cashRegisterStore/fetchAll")
      .finally(() => (this.loading = false));
  }
}
</script>
