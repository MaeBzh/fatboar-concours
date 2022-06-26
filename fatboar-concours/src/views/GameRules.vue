<template>
    <embed :src="iframeSrcUrl" width="100%" :height="iframeHeight" />
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
    
    return this.currentGame ? this.getFileUrl(this.currentGame.gameRules) : '#';
  }

  get iframeSrcUrl() {
    return `https://docs.google.com/viewer?url=${this.gameRulesPdfUrl}&embedded=true`;
  }

  get iframeHeight() {
    const element = document.getElementsByClassName("v-main__wrap")[0] as Element & {offsetHeight: number};

    return `${element.offsetHeight}px`;
  }

  get currentGame() {
    return this.$store.getters["gameStore/getCurrentGame"];
  }

  created() {
    this.$store.dispatch("gameStore/fetchCurrentGame");
  }
}
</script>
