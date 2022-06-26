<template>
  <div>
    <p class="text-center">
        Un problème d'affichage ?
        <v-btn text :href="gameRulesPdfUrl" download>
          Télécharger le réglement au format PDF
        </v-btn>
    </p>
    <iframe id="pdfViewer" :src="iframePdfUrl" />
  </div>
</template>
<script lang="ts">
import FileDownloadMixin from "@/mixins/file-download.mixin";
import { Component } from "vue-property-decorator";

@Component({
  metaInfo() {
    return {
      title: "Réglement du jeu",
      content:
        "Réglement du jeu-concours organisé par les restaurants de burger de gibier Fatboar",
    };
  },
})
export default class GameRules extends FileDownloadMixin {
  get gameRulesPdfUrl() {
    return this.currentGame ? this.getFileUrl(this.currentGame.gameRules) : "#";
  }

  get iframePdfUrl() {
    return `https://docs.google.com/viewer?url=${this.gameRulesPdfUrl}&embedded=true`;
  }

  get currentGame() {
    return this.$store.getters["gameStore/getCurrentGame"];
  }

  async mounted() {
    await this.$store.dispatch("gameStore/fetchCurrentGame");
    if (!this.currentGame) {
      this.$router.push({ name: "home" });
    }
  }
}
</script>

<style scoped>
#pdfViewer {
  min-height: 80vh;
  width: 100%;
  border: none;
}
</style>
