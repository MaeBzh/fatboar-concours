<template>
  <div>
    <v-snackbar
      :value="!!message"
      color="accent"
      centered
      content-class="primary--text"
      @input="message = ''"
    >
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          class="primary--text"
          outlined
          v-bind="attrs"
          @click="message = ''"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class EventAlert extends Vue {
  message = "";

  get entityDeletedEvent() {
    return this.$store.getters["eventStore/getEntityDeletedEvent"];
  }

  get entityCreatedEvent() {
    return this.$store.getters["eventStore/getEntityCreatedEvent"];
  }

  get entityUpdatedEvent() {
    return this.$store.getters["eventStore/getEntityUpdatedEvent"];
  }

  get rgpdAcceptedEvent() {
    return this.$store.getters["eventStore/getRgpdAcceptedEvent"];
  }

  get userCreatedEvent() {
    return this.$store.getters["eventStore/getUserCreatedEvent"];
  }

  get errorEvent() {
    return this.$store.getters["eventStore/getErrorEvent"];
  }

  get wrongCredentialsEvent() {
    return this.$store.getters["eventStore/getWrongCredentialsEvent"];
  }

  get accountNotActivatedEvent() {
    return this.$store.getters["eventStore/getAccountNotActivatedEvent"];
  }

  get badGameTicketEvent() {
    return this.$store.getters["eventStore/getBadGameTicketEvent"];
  }

  get contactMailSentEvent() {
    return this.$store.getters["eventStore/getContactMailSentEvent"];
  }

  get throttleEvent() {
    return this.$store.getters["eventStore/getThrottleEvent"];
  }

  get profileUpdatedEvent() {
    return this.$store.getters["eventStore/getProfileUpdatedEvent"];
  }

  @Watch("entityDeletedEvent")
  onDeletedEventChange(event) {
    if (event?.name) {
      this.message = "Suppression réussie !";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("entityUpdatedEvent")
  onUpdatedEventChange(event) {
    if (event?.name) {
      this.message = "Mise à jour réussie !";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("entityCreatedEvent")
  onCreatedEventChange(event) {
    if (event?.name) {
      this.message = "Création réussie !";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("rgpdAcceptedEvent")
  onRgpdAcceptedEventChange(event) {
    if (event?.name) {
      this.message =
        " Votre acceptation de la politique d'utilisation de vos données à bien été prise en compte.";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("userCreatedEvent")
  onUserCreatedEventChange(event) {
    if (event?.name) {
      this.message =
        " Votre compte a bien été créé. Nous vous avons envoyé un email de confirmation à l'adresse mail indiquée.";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("errorEvent")
  onErrorEventChange(event) {
    if (event?.name) {
      this.message =
        "Une erreur est survenue, veuillez réessayer ultérieurement.";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("wrongCredentialsEvent")
  onWrongCredentialsEventChange(event) {
    if (event?.name) {
      this.message = "Nous ne connaissons pas ces identifiants";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("accountNotActivatedEvent")
  onAccountNotActivatedEventChange(event) {
    if (event?.name) {
      this.message =
        "Votre compte n'est pas activé. Si vous n'avez plus le mail d'activation, veuillez nous contacter via le formulaire de contact";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("contactMailSentEvent")
  onContactMailSentEventChange(event) {
    if (event?.name) {
      this.message =
        "Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("badGameTicketEvent")
  onBadGameTicketEventChange(event) {
    if (event?.name) {
      this.message =
        "Nous n'avons trouvé aucun ticket gagnant correspondant à ce numéro et à ce montant, " +
        "veuillez vérifier les informations entrées. Si vous pensez avoir entré des informations correctes, " +
        " vous pouvez nous contacter via le formulaire de contact.";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("verifyBadTicketEvent")
  onverifyBadTicketEventChange(event) {
    if (event?.name) {
      this.message =
        "Nous n'avons trouvé aucun ticket gagnant correspondant à ce numéro et à ce montant, " +
        "veuillez entrer un autre numéro.";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("throttleEvent")
  onThrottleEventChange(event) {
    if (event?.name) {
      this.message =
        "Vous avez dépassé le nombre de tentatives autorisées. Veuillez retenter votre chance dans 5 minutes.";
      this.$store.commit("eventStore/remove", event);
    }
  }

  @Watch("profileUpdatedEvent")
  onProfileUpdatedEventChange(event) {
    if (event?.name) {
      this.message = "Vos informations ont été mises à jour.";
      this.$store.commit("eventStore/remove", event);
    }
  }
}
</script>
