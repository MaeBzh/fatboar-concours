<template>
  <v-footer color="primary" min-height="100px">
    <v-row justify="center" class="mt-4">
        <v-btn
          v-for="route in routes"
          :key="route.name"
          :to="{ name: route.name }"
          color="accent"
          text
          rounded
          class="my-2"
        >
          {{ route.meta.footer }}
        </v-btn>
    </v-row>
    <div class="text-center accent--text mt-4 col-12">
      <p>Pour votre santé, pratiquez une activité physique régulière</p>
      <a href="http://www.mangerbouger.fr" class="accent--text"
        >www.mangerbouger.fr</a
      >
    </div>
    <v-col class="text-center accent--text copyright mt-4 col-12">
      Site développé par Furious Ducks - {{ new Date().getFullYear() }}
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import routes from '../../routes';

@Component
export default class Footer extends Vue {

  get routes() {
    return routes
      .filter((route) => route?.meta?.footer)
      .filter((route) => !route?.meta?.onlyIfCurrentGame || !!this.currentGame);
  }

  get currentGame() {
    return this.$store.getters["gameStore/getCurrentGame"];
  }

  created() {
    this.$store.dispatch("gameStore/fetchCurrentGame");
  }
}
</script>
<style scoped>
.copyright {
  font-family: "lato-italic";
  font-size: "1em";
}
</style>
