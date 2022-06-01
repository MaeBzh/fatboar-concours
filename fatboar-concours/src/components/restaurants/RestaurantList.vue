<template>
  <v-container>
    <item-list
      model="restaurant"
      title="Liste des restaurants"
      :items="restaurants"
      :headers="headers"
      :loading="loading"
    />
  </v-container>
</template>

<script lang="ts">
import { Restaurant } from "@/models";
import { ConfirmRef } from "@/types/confirm";
import { Component, Vue, Ref } from "vue-property-decorator";

@Component
export default class RestaurantList extends Vue {
  @Ref("restaurantDelete") readonly delete!: ConfirmRef;
  public loading = false;
  public search = "";

  get headers() {
    return [
      { text: "#", value: "id" },
      { text: "Name", value: "name" },
      { text: "City", value: "city" },
    ];
  }

  get restaurants(): Restaurant[] {
    return this.$store.getters["restaurantStore/getAll"];
  }

  async mounted(): Promise<void> {
    this.loading = true;
    await this.$store.dispatch("restaurantStore/fetchAll");
    this.loading = false;
  }
}
</script>
