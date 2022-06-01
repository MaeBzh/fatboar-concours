<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-btn
      v-if="!authenticated"
      class="accent primary--text mr-4 identification-btn"
      :to="{ name: 'login' }"
      >Identifiez-vous</v-btn
    >
    <v-btn
      v-else
      class="accent primary--text mr-4 identification-btn"
      :to="{ name: 'logout' }"
      >Se déconnecter</v-btn
    >
  </v-row>
</template>
<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

@Component
export default class LogButton extends Vue {
  @Prop({ default: false }) readonly authenticated!: boolean;
}
</script>

<style scoped>
.identification-btn {
  border-top-left-radius: 0%;
  border-top-right-radius: 0%;
}
</style>
