<template>
  <v-card class="card" max-width="50em">
    <v-card-title> Game details </v-card-title>
    <v-card-text>
      <!-- <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <validation-provider v-slot="{ errors }" name="name" rules="max:15">
            <v-text-field
              :value="currentGame.name"
              :error-messages="errors"
              label="Name"
              :disabled="edit == 0"
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="description"
            rules="max:15"
          >
            <v-text-field
              :error-messages="errors"
              :value="currentGame.description"
              label="Description"
              multiline
              :disabled="edit == 0"
            ></v-text-field>
          </validation-provider>
          <v-row>
            <v-col cols="12" sm="6">
              <validation-provider name="startsOn">
                <v-menu
                  ref="menuStartsOn"
                  v-model="menuStartsOn"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="startsOnFormatted"
                      label="Start date"
                      prepend-icon="mdi-calendar"
                      readonly
                      :disabled="edit == 0"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :value="startsOnFormatted"
                    @input="menuStartsOn = false"
                    @change="onStartDateChange"
                  ></v-date-picker>
                </v-menu>
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="6">
              <validation-provider name="endsOn">
                <v-menu
                  ref="menuEndsOn"
                  v-model="menuEndsOn"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="endsOnFormatted"
                      label="End date"
                      prepend-icon="mdi-calendar"
                      readonly
                      :disabled="edit == 0"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :value="endsOnFormatted"
                    :min="startsOnFormatted"
                    @input="menuEndsOn = false"
                    @change="onEndDateChange"
                  ></v-date-picker>
                </v-menu>
              </validation-provider>
            </v-col>
          </v-row>

          <validation-provider v-slot="{ errors }" name="gameRules">
            <v-file-input
              v-model="file"
              :value="currentGame.gameRules"
              :error-messages="errors"
              label="Game rules"
              :disabled="edit == 0"
            ></v-file-input>
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="gifts">
            <v-select
              v-model="currentGifts"
              :items="gifts"
              multiple
              item-text="name"
              item-value="id"
              :error-messages="errors"
              label="Gifts"
              :disabled="edit == 0"
            >
            </v-select>
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="jackpotGift">
            <v-select
              v-model="jackpotGift"
              :items="gifts"
              item-text="name"
              item-value="id"
              :error-messages="errors"
              label="Jackpot Gift"
              :disabled="edit == 0"
            >
              <template #item="{ item }">
                <p>{{ item.name }}</p>
              </template>
              <template #selection="{ item }">
                <p>{{ item.name }}</p>
              </template>
            </v-select>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="activated"
          >
            <v-checkbox
              :error-messages="errors"
              label="Activate game"
              type="checkbox"
              required
              :disabled="edit == 0"
              :checked="currentGame.activated"
            ></v-checkbox>
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="jackpotDraw">
            <v-text-field
              :error-messages="errors"
              v-model="currentGame.jackpotDraw"
              label="Jackpot has been drawn on"
              disabled
            ></v-text-field>
          </validation-provider>

          <v-btn
            class="mr-4"
            :disabled="edit == 1"
            type="button"
            @click.prevent="edit = !edit"
            v-if="isEditable"
          >
            Edit
          </v-btn>
          <v-btn
            class="mr-4"
            type="button"
            :disabled="invalid"
            @click="submit"
            v-if="isEditable"
          >
            Validate
          </v-btn>
        </form>
      </validation-observer> -->
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
// import { ValidationObserver, ValidationProvider } from "vee-validate";
// import { mapGetters } from "vuex";
// import { Game } from "@/models/game.model";
// import { Gift } from "@/models/gift.model";

// declare module "vue/types/vue" {
//   interface Vue {
//     edit: boolean;
//     currentGame: Game | null;
//     currentGifts: Gift[];
//     jackpotGift: Gift | null;
//     formatDate(timestamp: number | string): string;
//   }
// }

// export default {
//   name: "GameDetails",
//   components: {
//     ValidationProvider,
//     ValidationObserver,
//   },
//   data() {
//     return {
//       edit: false,
//       jackpotGift: null as Gift | null,
//       file: null,
//       menuStartsOn: false,
//       menuEndsOn: false,
//       currentGifts: [] as Gift[],
//     };
//   },

//   methods: {
//     async submit(): Promise<void> {
//       this.edit = !this.edit;
//       await (
//         this.$refs.observer as InstanceType<typeof ValidationObserver>
//       ).validate();
//       //todo : call api resource to update in DB
//       this.$store.dispatch("gameStore/updateItem", this.currentGame);
//       this.$router.push({ name: "Games" });
//     },

//     formatDate(timestamp: number | string): string {
//       return new Date(timestamp).toISOString().substr(0, 10);
//     },

//     onStartDateChange(timestamp: number | string): void {
//       const { endsOn } = this.currentGame as Game;
//       const startsOn = new Date(timestamp).getTime();
//       if (startsOn > endsOn) {
//         (this.currentGame as Game).endsOn = 0;
//       }
//       (this.currentGame as Game).startsOn = startsOn;
//     },

//     onEndDateChange(timestamp: number | string): void {
//       (this.currentGame as Game).endsOn = new Date(timestamp).getTime();
//     },
//   },

//   computed: {
//     gameId(): number {
//       return +this.$route.params.id;
//     },

//     ...mapGetters({
//       getGame: "gameStore/getOne",
//       gifts: "giftStore/getAll",
//       games: "gameStore/getAll",
//       giftOfCurrentGame: "giftStore/getGiftsForOneGame",
//     }),

//     isEditable(): boolean {
//       return !this.currentGame?.activated ?? false;
//     },

//     startsOnFormatted(): string {
//       return this.currentGame && this.currentGame.startsOn
//         ? this.formatDate(this.currentGame.startsOn)
//         : "";
//     },

//     endsOnFormatted(): string {
//       return this.currentGame && this.currentGame.endsOn
//         ? this.formatDate(this.currentGame.endsOn)
//         : "";
//     },

//     currentGame(): Game {
//       return this.getGame(this.gameId);
//     },
//   },

//   created() {
//     // this.$store.dispatch("gameStore/fetchItem", this.gameId);
//     //not working 4. Todo : redirect to 404 if resource doesn't exist
//     this.currentGifts = this.giftOfCurrentGame(this.currentGame.id);
//     this.jackpotGift =
//       this.currentGifts.find((gift) => gift.isJackpot === true) ?? null;
//   },
// };
</script>

<style>
.card {
  margin: 2em auto;
}
</style>
