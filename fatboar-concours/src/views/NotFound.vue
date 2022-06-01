<template>
  <div class="secondary">
    <div class="d-flex flex-column align-center">
      <h1 class="fatboar-title primary--text">404</h1>
      <h2 class="fatboar-subtitle">Cette page n'existe pas</h2>
      <router-link :to="{ name: 'home' }"
        >Revenir à la page d'accueil</router-link
      >
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class About extends Vue {}
</script>
<style scoped>
.fatboar-title,
.fatboar-subtitle {
  font-size: 4em;
}
.about-text {
  width: 60%;
}
</style>
