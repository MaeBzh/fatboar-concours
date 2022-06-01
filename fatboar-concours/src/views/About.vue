<template>
  <div>
    <div class="secondary">
      <div class="d-flex flex-column align-center">
        <h1 class="fatboar-title primary--text">Fatboar</h1>
        <h2 class="fatboar-subtitle">burger restaurant</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>
      </div>
    </div>
    <v-row class="accent my-8 pa-8 d-flex justify-center">
      <div class="about-text">
        <p class="ma-4">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </p>
      </div>
    </v-row>
    <div class="secondary my-8 pa-8 d-flex justify-center">
      <v-img
        src="/assets/images/pdg.jpg"
        max-width="200"
        max-height="200"
        class="ma-2 d-flex"
        alt="La photo du PDG de Fatboar"
      />
      <div class="about-text">
        <p class="ma-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  metaInfo() {
    return {
      title: "A propos du restaurant de burger Fatboar",
      content: "L'histoire de fatboar et de son fondateur",
    };
  },
})
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
