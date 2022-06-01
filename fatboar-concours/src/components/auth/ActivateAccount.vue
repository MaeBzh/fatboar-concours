<template>
  <v-container>
    <v-card class="card" max-width="50em" :loading="loading">
      <v-card-title class="primary--text card-title"
        >Activation de votre compte</v-card-title
      >
      <v-card-text v-if="!loading && isActivated"
        >Votre compte a été activé, vous pouvez dés à présent vous
        connecter</v-card-text
      >
      <v-card-text v-if="!loading && !isActivated"
        >Nous n'avons pas pu activer votre compte. Si vous pensez qu'il s'agit
        d'une erreur, vous pouvez nous contacter via le
        <router-link :to="{ name: 'contact' }"
          >formulaire de contact</router-link
        ></v-card-text
      >
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ActivateAccount extends Vue {
  public loading = false;
  public isActivated = false;
  async mounted() {
    this.loading = true;
    try {
      await this.$store.dispatch(
        "authStore/activateAccount",
        this.$route.params.token
      );
      this.isActivated = true;
    } catch (error) {
      this.isActivated = false;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.card {
  margin: 2em auto;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-items: center;
}
</style>
