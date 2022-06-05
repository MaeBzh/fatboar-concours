<template>
  <v-container>
    <v-card :loading="loading">
      <v-card-title class="card-title">Statistiques</v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <v-card-subtitle class="d-flex justify-center primary--text chart-title"
          >Répartition des clients par tranches d'âges</v-card-subtitle
        >
        <pie-chart
          class="my-8"
          :chartData="clientAgesData"
          :chartOptions="chartOptions"
          chartId="clientAges"
        ></pie-chart>

        <template v-if="currentGame">
          <v-divider class="mx-4"></v-divider>
          <v-card-subtitle
            class="d-flex justify-center primary--text chart-title"
            >Répartition des tickets du jeu actuel
          </v-card-subtitle>
          <pie-chart
            class="my-8"
            :chartData="ticketsData"
            :chartOptions="chartOptions"
            chartId="tickets"
          ></pie-chart>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PieChart from "../components/charts/PieChart.vue";
import { gameResource } from "@/resources";

@Component({
  components: { PieChart },
  metaInfo() {
    return {
      title: "Statistiques du site fatboar",
      content:
        "Des statistiques d'utilisation du site fatboar-concours et du jeu et de ses utilisateurs",
    };
  },
})
export default class Charts extends Vue {
  public clientsAgesRepartition = { younger: 0, middle: 0, older: 0 };
  public ticketsRepartition = {
    used: 0,
    unused: 0,
    unassigned: 0,
  };
  public loading = false;

  public get currentGame() {
    return this.$store.getters["gameStore/getCurrentGame"];
  }

  public get tickets() {
    return this.$store.getters["ticketStore/getAll"];
  }

  public get clients() {
    return this.$store.getters["clientStore/getAll"];
  }

  public get clientAgesData() {
    return {
      labels: ["18-34 ans", "35-59 ans", "+ de 60 ans"],
      datasets: [
        {
          backgroundColor: ["#010326", "#c3151e", "#ffc24d"],
          data: Object.values(this.clientsAgesRepartition),
        },
      ],
    };
  }

  public get ticketsData() {
    return {
      labels: [
        "Utilisés par un client",
        "Assignés à un client mais non utilisés",
        "Non assignés",
      ],
      datasets: [
        {
          backgroundColor: ["#89af35", "#ffc24d", "#c3151e"],
          data: Object.values(this.ticketsRepartition),
        },
      ],
    };
  }

  public get chartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  public setClientAges() {
    const clientsAges = this.clients.map((client) => {
      return new Date().getFullYear() - client.birthYear;
    });
    clientsAges.forEach((age) => {
      if (age < 35) {
        return this.clientsAgesRepartition.younger++;
      } else if (age > 59) {
        return this.clientsAgesRepartition.older++;
      } else {
        return this.clientsAgesRepartition.middle++;
      }
    });
  }

  async mounted() {
    try {
      this.loading = true;
      await this.$store.dispatch("clientStore/fetchAll");
      this.setClientAges();

      await this.$store.dispatch("gameStore/fetchCurrentGame");
      if (this.currentGame) {
        this.ticketsRepartition = await gameResource.getGameStats(
          this.currentGame
        );
      }
    } catch (error) {
      this.$store.commit("eventStore/add", { name: "error" });
    } finally {
      this.loading = false;
    }
  }
}
</script>
<style scoped>
.chart-title {
  font-size: 1.8em;
}
</style>
