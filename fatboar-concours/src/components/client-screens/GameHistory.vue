<template>
  <v-card-text v-if="tickets.length" class="d-flex flex-column align-center">
    <div class="font-weight-bold ma-4 primary--text history-title">
      Historique de vos gains
    </div>

    <v-timeline align-top dense>
      <v-timeline-item
        v-for="ticket in tickets"
        :key="ticket.id"
        small
        color="accent"
      >
        <template v-slot:icon>
          <v-avatar>
            <v-img
              :src="getGiftImage(ticket.gift.photo)"
              max-height="50px"
              max-width="50px"
              :alt="ticket.gift.name"
            ></v-img>
          </v-avatar>
        </template>
        <div>
          <v-row class="font-weight-normal mb-2 d-flex align-center">
            <strong class="ml-2 primary--text">{{ ticket.gift.name }}</strong>
          </v-row>
          <div>
            Gagné le :
            {{ formatDate(new Date(ticket.assignedOn), "PPP") }}
          </div>
          <div>Gain retiré : {{ ouiNon(!!ticket.withdrawnOn) }}</div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-card-text>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { formatDate, OuiNon } from "@/helpers/utils";
import FileDownloadMixin from "@/mixins/file-download.mixin";

@Component
export default class GameHistory extends FileDownloadMixin {
  public formatDate = formatDate;
  public ouiNon = OuiNon;

  get tickets() {
    const tickets = this.$store.getters["ticketStore/getAll"];
    const sortedTickets = tickets.sort((objA, objB) => new Date(objB.assignedOn).getTime() -new Date(objA.assignedOn).getTime());
    return sortedTickets;
  }

  getGiftImage(filename: string): string {
    return this.getFileUrl(filename);
  }
}
</script>
