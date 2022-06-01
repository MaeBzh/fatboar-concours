<template>
  <v-footer color="primary" min-height="100px">
    <v-row justify="center" class="mt-4">
      <v-btn
        v-for="item in items"
        :key="item.name"
        :to="{ name: item.route }"
        color="accent"
        text
        rounded
        class="my-2"
      >
        {{ item.name }}
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

@Component
export default class Footer extends Vue {
  public items = [
    {
      name: "A propos",
      route: "about",
    },
    {
      name: "Contact",
      route: "contact",
    },
    {
      name: "Mentions légales",
      route: "legal",
    },
    {
      name: "Données personnelles",
      route: "personalData",
    },
    {
      name: "Conditions d'utilisation",
      route: "tos",
    },
    {
      name: "Règlement du jeu",
      route: "gameRules",
    },
    {
      name: "FAQ",
      route: "faq",
    },
  ];
}
</script>
<style scoped>
.copyright {
  font-family: "lato-italic";
  font-size: "1em";
}
</style>
