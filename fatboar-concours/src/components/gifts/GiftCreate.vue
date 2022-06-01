<template>
  <v-container>
    <v-card :loading="loading">
      <v-card-title>Ajouter un cadeau</v-card-title>
      <v-card-text>
        <validation-observer ref="form" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="name"
              rules="required|max:45"
            >
              <v-text-field
                v-model="gift.name"
                :error-messages="errors"
                label="Name"
                outlined
              ></v-text-field>
            </validation-provider>

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

            <v-btn color="primary--text" outlined @click="reset">
              Réinitialiser
            </v-btn>
            <v-btn
              class="ma-4"
              color="primary--text accent"
              type="submit"
              :disabled="invalid || loading"
            >
              Valider
            </v-btn>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Gift } from "@/models";
import SelectIcon from "@/components/commons/SelectIcon.vue";
import { ValidatorRef } from "@/types/validator";
import { Component, Ref, Vue } from "vue-property-decorator";
import { mdiIcons } from "../commons/icons";

@Component({
  components: { SelectIcon },
})
export default class GiftCreate extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public gift: Partial<Gift> & { photo?: File } = {
    name: "",
    photo: undefined,
    icon: "",
    isJackpot: false,
  };
  public get icons() {
    return mdiIcons.map((i) => `mdi-${i}`);
  }

  async submit(): Promise<void> {
    this.loading = true;
    const isValid = await this.form.validate();
    if (isValid) {
      try {
        await this.$store.dispatch("giftStore/create", this.gift);
        this.$store.commit("eventStore/add", {
          name: "entityCreated",
        });
        this.$router.push({ name: "gifts" });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      }
    }
    this.loading = false;
  }

  reset(): void {
    this.gift = { name: "", photo: undefined, isJackpot: false };
    this.form.reset();
  }
}
</script>
