<template>
  <v-container>
    <v-card class="pa-8">
      <v-card-title class="card-title">Foire aux questions</v-card-title>
      <v-card-text>
        <h5 class="primary--text">
          Q: Dolor iusto suscipit autem. Eveniet pariatur recusandae autem. Sunt
          culpa sit non. Ipsa dolores rerum totam ?
        </h5>
        <p>
          R: Non, Ex neque maiores quis dolores sunt. Modi quasi nihil est.
          Necessitatibus animi maxime in tenetur consequuntur ut minus.
        </p>
        <h5 class="primary--text">Q: Quidem repellendus amet sint ?</h5>
        <p>
          R: Oui, Deserunt fuga consectetur similique. Unde nulla ipsam eveniet
          commodi. Quo nesciunt reprehenderit quod et consequuntur sit sunt. Et
          numquam tempora qui explicabo praesentium repellendus sint
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  metaInfo() {
    return {
      title: "Foire aux questions",
      content:
        "Pour trouver la réponse à vos questions, vous pouvez chercher dans la liste des questions déjà posées par nos clients",
    };
  },
})
export default class FAQ extends Vue {}
</script>
