<template>
  <div>
    <iframe :src="gameRulesPdf" style="width: 100%; height: 300px"> </iframe>
  </div>
</template>
<script lang="ts">
import FileDownloadMixin from "@/mixins/file-download.mixin";
import { Game } from "@/models";
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
  public currentGame!: Game;

  get gameRulesPdf() {
    return this.getFileUrl(this.currentGame.gameRules);
  }

  created() {
    this.$store.dispatch("gameStore/fetchCurrentGame");
    this.currentGame = this.$store.getters["gameStore/getCurrentGame"];
  }
}
</script>
