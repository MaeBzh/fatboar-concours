<template>
  <v-container>
    <item-list
      model="gift"
      title="Liste des cadeaux"
      :headers="headers"
      :loading="loading"
    >
      <template v-slot:[`item.photo`]="{ item }">
        <img :src="getFileUrl(item.photo)" :alt="item.name" class="images" />
      </template>

      <template v-slot:[`item.icon`]="{ item }">
        <v-icon>{{ item.icon }}</v-icon>
      </template>
    </item-list>
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import FileDownloadMixin from "@/mixins/file-download.mixin";

@Component
export default class GiftList extends FileDownloadMixin {
  public loading = false;

  get headers() {
    return [
      { text: "#", value: "id" },
      { text: "Nom", value: "name" },
      { text: "Photo", value: "photo" },
      { text: "Icone", value: "icon" },
      { text: "Jackpot", value: "isJackpot" },
    ];
  }

  mounted(): void {
    this.loading = true;
    this.$store
      .dispatch("giftStore/fetchAll")
      .finally(() => (this.loading = false));
  }
}
</script>

<style lang="css" scoped>
.images {
  max-width: 20vh;
  height: auto;
}
</style>
