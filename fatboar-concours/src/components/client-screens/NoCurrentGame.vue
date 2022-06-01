<template>
  <div class="d-flex flex-column align-center">
    <h1 class="fatboar-title primary--text d-flex flex-column align-center">
      Fatboar
    </h1>
    <h2 class="my-8">Aucun jeu-concours n'est organisé en ce moment</h2>
    <h3 width="50%" class="text-center mx-8">
      Pour être au courant dès qu'un nouveau jeu débute, ainsi que de toutes les
      nouveautés dans votre restaurant préféré, suivez-nous sur les réseaux
      sociaux
    </h3>
    <div class="my-8">
      <v-btn icon>
        <v-icon
          size="x-large"
          aria-label="Facebook"
          role="link"
          aria-hidden="false"
          class="social-btn"
          >mdi-facebook</v-icon
        >
      </v-btn>

      <v-btn icon>
        <v-icon
          size="x-large"
          aria-label="Twitter"
          role="link"
          aria-hidden="false"
          class="social-btn"
          >mdi-twitter</v-icon
        >
      </v-btn>

      <v-btn icon>
        <v-icon
          size="x-large"
          aria-label="Instagram"
          role="link"
          aria-hidden="false"
          class="social-btn"
          >mdi-instagram</v-icon
        >
      </v-btn>
    </div>
    <v-img
      src="/assets/images/presentation-image.png"
      max-height="50%"
      max-width="30%"
      class="mt-8"
      alt="Un hamburger et des frites posés sur une planche en bois"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class About extends Vue {}
</script>
<style scoped>
.fatboar-title {
  font-size: 4em;
}

.v-btn {
  margin: 1.5em;
}

.v-icon {
  color: #010326 !important;
}

.v-icon:hover {
  color: #ffc24d !important;
}
</style>
