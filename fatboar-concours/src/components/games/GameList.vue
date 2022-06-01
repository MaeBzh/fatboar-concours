<template>
  <v-container>
    <item-list
      model="game"
      title="Liste des jeux"
      :headers="headers"
      :loading="loading"
      :sortDesc="true"
      :drawBtn="true"
      @draw="drawJackpot"
    >
      <template v-slot:[`item.startsOn`]="{ item }">
        {{ formatDate(item.startsOn, "P") }}
      </template>

      <template v-slot:[`item.endsOn`]="{ item }">
        {{ formatDate(item.endsOn, "P") }}
      </template>

      <template v-slot:[`item.activated`]="{ item }">
        {{ item.activated ? "Oui" : "Non" }}
      </template>

      <template v-slot:[`item.jackpotDraw`]="{ item }">
        {{ !!item.jackpotDraw ? formatDate(item.jackpotDraw, "P") : "-" }}
      </template>

      <template v-slot:[`item.rulesValidation`]="{ item }">
        {{
          !!item.rulesValidation ? formatDate(item.rulesValidation, "P") : "-"
        }}
      </template>

      <template v-slot:[`item.description`]="{ item }">
        <v-tooltip bottom max-width="300px">
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">{{
              truncateText(item.description)
            }}</span>
          </template>
          <span>{{ item.description }}</span>
        </v-tooltip>
      </template>
    </item-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { formatDate, convertToCSV } from "@/helpers/utils";

@Component
export default class GameList extends Vue {
  public loading = false;
  public formatDate = formatDate;
  public convertToCSV = convertToCSV;
  public get headers() {
    return [
      { text: "#", value: "id" },
      { text: "Nom", value: "name" },
      { text: "Début le", value: "startsOn" },
      { text: "Fin le", value: "endsOn" },
      { text: "Activé", value: "activated" },
      { text: "Description", value: "description" },
      { text: "Règlement", value: "gameRules" },
      { text: "Tirage le", value: "jackpotDraw" },
      { text: "Règlement validé le", value: "rulesValidation" },
    ];
  }

  public truncateText(text: string): string {
    return text.length > 75 ? `${text.substring(0, 75)}...` : text;
  }

  public async drawJackpot(item) {
    await this.$store.dispatch(
      "ticketStore/fetchAllTicketsForCurrentGame",
      item.id
    );
    const tickets = this.$store.getters["ticketStore/getAll"];

    const wonTickets = tickets
      .filter((ticket) => {
        return ticket.user != null;
      })
      .map((ticket) => {
        return {
          numéro: ticket.number,
          prénom: ticket.user.firstname,
          nom: ticket.user.lastname,
          email: ticket.user.email,
          jeu: item.id,
        };
      });

    const headers = ["numéro", "nom", "prénom", "email", "jeu"];
    const csv = this.convertToCSV(wonTickets, headers);
    const date = formatDate(new Date(), "P");
    const csvName = `liste-tirage-au-sort-jeu-${item.id}-${date}.csv`;
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

  created() {
    this.loading = true;
    this.$store
      .dispatch("gameStore/fetchAll")
      .finally(() => (this.loading = false));
  }
}
</script>
