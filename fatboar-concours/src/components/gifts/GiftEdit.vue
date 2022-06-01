<template>
  <v-container>
    <v-card :loading="loading" class="pa-8" width="80%">
      <v-card-title> Modifier ce cadeau </v-card-title>
      <validation-observer ref="form" v-slot="{ invalid }">
        <form v-if="!!gift" @submit.prevent="submit">
          <v-card-text>
            <validation-provider
              v-slot="{ errors }"
              name="name"
              rules="required|max:45"
            >
              <v-text-field
                v-model="gift.name"
                :error-messages="errors"
                label="Nom"
                outlined
              ></v-text-field>
            </validation-provider>

            <v-divider class="my-8"></v-divider>

            <v-row d-flex align-center>
              <v-col v-if="!downloadNewPhoto">
                <img
                  :src="getFileUrl(gift.photo)"
                  :alt="gift.name"
                  class="images"
                />
              </v-col>
              <v-col v-if="!downloadNewPhoto">
                <v-btn
                  class="accent primary--text"
                  @click="downloadNewPhoto = !downloadNewPhoto"
                  >Télécharger une nouvelle photo</v-btn
                >
              </v-col>

              <v-col v-else class="col-12">
                <validation-provider
                  v-slot="{ errors, validate }"
                  name="photo"
                  rules="required|image"
                >
                  <v-file-input
                    v-model="gift.photo"
                    :error-messages="errors"
                    label="Photo"
                    accept="*/images"
                    outlined
                    @change="validate"
                  ></v-file-input>
                </validation-provider>
              </v-col>
            </v-row>
            <v-divider class="my-8"></v-divider>

            <validation-provider
              v-slot="{ errors }"
              name="icon"
              rules="required"
            >
              <v-autocomplete
                v-model="gift.icon"
                :items="icons"
                outlined
                :error-messages="errors"
                label="Icône"
              >
                <template v-slot:item="{ item }">
                  <v-icon>{{ item }}</v-icon> - {{ item }}
                </template>
              </v-autocomplete>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="isJackpot"
              rules="required|max:45"
            >
              <v-radio-group
                v-model="gift.isJackpot"
                :error-messages="errors"
                label="Ce cadeau est-il un cadeau jackpot ?"
              >
                <v-radio label="Oui" :value="true"></v-radio>
                <v-radio label="Non" :value="false"></v-radio>
              </v-radio-group>
            </validation-provider>
          </v-card-text>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              class="mr-4"
              type="button primary--text"
              outlined
              @click="$router.back()"
            >
              Annuler et retour
            </v-btn>
            <v-btn
              class="mr-4 accent primary--text"
              type="submit"
              :disabled="invalid || loading"
            >
              Enregistrer les modifications
            </v-btn>
          </v-card-actions>
        </form>
      </validation-observer>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Gift } from "@/models";
import { ValidatorRef } from "@/types/validator";
import { ConfirmRef } from "@/types/confirm";
import { Component, Ref, Vue } from "vue-property-decorator";
import { mdiIcons } from "../commons/icons";
import FileDownloadMixin from "@/mixins/file-download.mixin";

@Component
export default class GiftEdit extends FileDownloadMixin {
  @Ref("confirmReplaceToken") readonly confirmReplaceToken!: ConfirmRef;
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public gift: Partial<Gift> & { photo?: File } = {
    name: "",
    photo: undefined,
    icon: "",
    isJackpot: false,
  };
  public downloadNewPhoto = false;

  public get icons() {
    return mdiIcons.map((i) => `mdi-${i}`);
  }

  async submit(): Promise<void> {
    this.loading = true;
    const isValid = await this.form.validate();
    if (isValid) {
      try {
        await this.$store.dispatch("giftStore/update", this.gift);
        this.$store.commit("eventStore/add", {
          name: "entityUpdated",
        });
        this.$router.push({ name: "gifts" });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      }
    }
    this.loading = false;
  }

  async mounted() {
    this.loading = true;

    const giftId = +this.$route.params.id;
    this.gift = await this.$store.dispatch("giftStore/fetchOne", giftId);

    this.loading = false;
  }
}
</script>
