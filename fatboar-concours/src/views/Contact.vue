<template>
  <v-container class="d-flex justify-space-around">
    <v-card class="card" width="60%" :loading="loading">
      <v-card-title>Nous envoyer un message </v-card-title>
      <v-card-text>
        <validation-observer ref="form" v-slot="{ invalid }">
          <v-form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="name"
              rules="required|max:45"
            >
              <v-text-field
                v-model="message.name"
                :error-messages="errors"
                label="Nom"
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="message.email"
                :error-messages="errors"
                label="E-mail"
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="subject"
              rules="required"
            >
              <v-text-field
                v-model="message.subject"
                :error-messages="errors"
                label="Sujet de votre demande"
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="message"
              rules="required"
            >
              <v-text-field
                v-model="message.content"
                :error-messages="errors"
                label="Votre message"
              ></v-text-field>
            </validation-provider>

            <v-btn
              :disabled="invalid"
              color="accent"
              class="mr-4 mt-4 primary--text"
              @click="sendMessage"
            >
              Envoyer
            </v-btn>
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>
    <v-card class="card" width="30%">
      <v-card-title>Nos coordonnées </v-card-title>
      <v-card-text>
        <p class="primary--text">Siège social</p>
        <address>
          Fatboar SARL<br />
          1 bis rue Gustave Eiffel 78280 GUYANCOURT<br />
          Tel. 01 30 43 41 36<br />
          Email: fatboar@fatboar.com
        </address>
      </v-card-text>
      <v-card-text>
        <p class="primary--text">Service client jeux-concours</p>
        <address>
          Service jeux-concours<br />
          1 bis rue Gustave Eiffel 78280 GUYANCOURT<br />
          Tel. 01 30 43 41 37<br />
          Email: jeux-concours@fatboar.com
        </address>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mailService } from "@/services";

@Component({
  metaInfo() {
    return {
      title: "Formulaire de contact",
      content:
        "Formulaire pour contacter le service client Fatboar pour toute question ou suggestion",
    };
  },
})
export default class Contact extends Vue {
  public loading = false;
  public message = {
    name: "",
    email: "",
    subject: "",
    content: "",
  };

  async sendMessage(): Promise<void> {
    this.loading = true;
    try {
      await mailService.contact(this.message);
      this.$store.commit("eventStore/add", { name: "contactMailSended" });
      this.message = {
        name: "",
        email: "",
        subject: "",
        content: "",
      };
    } catch (error) {
      console.error(error);
      this.$store.commit("eventStore/add", { name: "error" });
    } finally {
      this.loading = false;
    }
  }
}
</script>
