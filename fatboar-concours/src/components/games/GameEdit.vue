<template>
  <v-container>
    <v-card class="card pa-8" max-width="50em" :loading="loading">
      <template v-if="initialized">
        <template v-if="!isUpdatable">
          <v-card-text v-if="game.activated"
            >Ce jeu est actuellement activé, il n'est plus modifiable
          </v-card-text>
          <v-card-text v-if="game.jackpotDraw"
            >Le tirage au sort de ce jeu a déjà été effectué, il n'est plus
            modifiable
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="mr-4"
              type="button"
              :disabled="loading"
              :to="{ name: 'games' }"
            >
              Retour à la liste
            </v-btn>
          </v-card-actions>
        </template>

        <template v-else>
          <v-card-title> Modifier ce jeu-concours </v-card-title>
          <v-card-text>
            <validation-observer ref="form" >
              <form @submit.prevent="submit">
                <validation-provider v-slot="{ errors }" name="name">
                  <v-text-field
                    v-model="game.name"
                    :error-messages="errors"
                    label="Intitulé"
                    outlined
                  ></v-text-field>
                </validation-provider>

                <validation-provider v-slot="{ errors }" name="description">
                  <v-textarea
                    :error-messages="errors"
                    v-model="game.description"
                    outlined
                    label="Description"
                  ></v-textarea>
                </validation-provider>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      :value="dateRangeText"
                      label="Sélectionnez la période du jeu"
                      readonly
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-date-picker
                      v-model="dates"
                      range
                      @change="setDates($event)"
                    ></v-date-picker>
                  </v-col>
                </v-row>
                <v-divider class="my-8"></v-divider>
                <v-row d-flex align-center>
                  <v-col v-if="!downloadNewRules">
                    <p class="mt-2">
                      Consulter le
                      <a :href="gameRulesUrl" target="_blank"
                        >réglement actuel</a
                      >
                    </p>
                  </v-col>
                  <v-col v-if="!downloadNewRules">
                    <v-btn
                      class="accent primary--text"
                      @click="downloadNewRules = !downloadNewRules"
                      >Télécharger un nouveau fichier</v-btn
                    >
                  </v-col>

                  <v-col v-else class="col-12">
                    <validation-provider
                      v-slot="{ errors, validate }"
                      name="gameRules"
                      rules="pdf"
                    >
                      <v-file-input
                        v-model="game.gameRules"
                        :error-messages="errors"
                        label="Réglement du jeu-concours"
                        accept=".pdf"
                        @change="validate"
                        outlined
                      ></v-file-input>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-divider class="my-8"></v-divider>
                <p class="primary--text">
                  Cadeaux sélectionnés et pourcentages de gain
                </p>

                <div
                  v-for="(gameGift, index) in selectedGameGifts"
                  :key="index"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="gifts"
                    rules="required"
                  >
                    <div class="d-flex justify-space-between">
                      <div class="gift-select">
                        <v-select
                          v-model="gameGift.gift"
                          :items="gifts"
                          item-text="name"
                          return-object
                          outlined
                          :error-messages="errors"
                        >
                        </v-select>
                      </div>
                      <div>
                        <v-text-field
                          v-model="gameGift.winPercentage"
                          color="primary"
                          type="number"
                          outlined
                          class="ml-2"
                          append-icon="mdi-percent"
                        >
                        </v-text-field>
                      </div>
                      <div class="my-2">
                        <v-btn
                          icon
                          class="error--text"
                          @click="deleteGift(gameGift)"
                          ><v-icon dark> mdi-trash-can-outline </v-icon></v-btn
                        >
                      </div>
                    </div>
                  </validation-provider>
                </div>
                <v-btn class="accent primary--text" @click="addGift"
                  >Ajouter un cadeau</v-btn
                >
                <v-divider class="my-8"></v-divider>
                <v-row>
                  <v-col v-if="!changeJackpot">
                    <p>
                      Actuellement, le jackpot sélectionné pour ce jeu est :
                      <strong class="primary--text">{{
                        game.jackpotGift.name
                      }}</strong>
                    </p>
                  </v-col>
                  <v-col v-if="!changeJackpot">
                    <v-btn
                      class="accent primary--text"
                      @click="changeJackpot = !changeJackpot"
                      >Modifier le cadeau jackpot</v-btn
                    >
                  </v-col>
                  <v-col v-if="changeJackpot">
                    <validation-provider
                      v-slot="{ errors }"
                      name="jackpotGift"
                      rules="required"
                    >
                      <v-select
                        v-model="game.jackpotGift"
                        :items="jackpotGifts"
                        return-object
                        item-text="name"
                        outlined
                        :error-messages="errors"
                        label="Jackpot"
                      >
                      </v-select>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-divider class="my-4"></v-divider>

                <validation-provider v-slot="{ errors }" name="activated">
                  <v-checkbox
                    v-model="game.activated"
                    :error-messages="errors"
                    label="Activer ce jeu immédiatement (il ne doit y avoir aucun jeu en cours actuellement)"
                    type="checkbox"
                    :disabled="!!currentGame"
                  ></v-checkbox>
                  <p v-if="!!currentGame">
                    Un jeu-concours est actuellement activé, vous ne pouvez pas
                    en activer un deuxième.
                  </p>
                </validation-provider>
                <span
                  class="error--text ma-2"
                  v-if="verifiedPercentage && totalPercentage !== 100"
                  >Pour valider le jeu, le total des pourcentages de gain des
                  cadeaux choisis doit être de 100%</span
                >
                <v-btn
                  class="mr-4 accent primary--text"
                  type="button"
                  :disabled="loading"
                >
                  Enregistrer
                </v-btn>
              </form>
            </validation-observer>
          </v-card-text>
        </template>
      </template>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { formatDate } from "@/helpers/utils";
import FileDownloadMixin from "@/mixins/file-download.mixin";
import { Game } from "@/models/game.model";
import { GameGift, Gift } from "@/models/gift.model";
import { ValidatorRef } from "@/types/validator";
import { isAfter } from "date-fns";
import { Component, Ref } from "vue-property-decorator";

@Component
export default class GameEdit extends FileDownloadMixin {
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public initialized = false;
  public game: Game = {} as Game;
  public isUpdatable = true;

  public file = null;
  public datePickers = {
    menuStartsOn: false,
    menuEndsOn: false,
  };
  public dates: string[] = [];
  public currentGame!: Game;
  public downloadNewRules = false;
  public changeGifts = false;
  public changeJackpot = false;
  public selectedGameGifts: GameGift[] = [];
  public totalPercentage = 0;
  public verifiedPercentage = false;

  async submit(): Promise<void> {
    this.verifyPercentage();
    this.loading = true;
    const isValid = await this.form.validate();
    if (isValid && this.totalPercentage === 100 && this.verifiedPercentage) {
      try {
        await this.$store.dispatch("gameStore/update", {
          ...this.game,
          gameGifts: this.selectedGameGifts,
        });
        this.$store.commit("eventStore/add", {
          name: "entityUpdated",
        });
        this.$router.push({ name: "games" });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      }
    }
  }

  get gifts(): Gift[] {
    return this.$store.getters["giftStore/getAllBasicGifts"];
  }

  get jackpotGifts(): Gift[] {
    return this.$store.getters["giftStore/getAllJackpotGifts"];
  }
  // activable only if a game is already activated and not finished
  get canActivateImmediately() {
    return !this.currentGame;
  }

  setDates(value: string[]) {
    const dates = value.map((d) => new Date(d));
    if (isAfter(dates[0], dates[1])) {
      this.game.startsOn = dates[1];
      this.game.endsOn = dates[0];
    } else {
      this.game.startsOn = dates[0];
      this.game.endsOn = dates[1];
    }
  }

  public onGiftChanged(gifts: Gift[]) {
    this.game.gameGifts = gifts.map((gift) => {
      const gameGift = this.game.gameGifts?.find(
        (gameGift) => gameGift.gift.id === gift.id
      );

      return { gift, winPercentage: gameGift?.winPercentage ?? 0 };
    });
  }

  public addGift() {
    this.selectedGameGifts.push({ gift: this.gifts[0], winPercentage: 0 });
  }

  public deleteGift(gameGift: GameGift) {
    this.selectedGameGifts = this.selectedGameGifts.filter(
      (gamegift) => gamegift.gift.id !== gameGift.gift.id
    );
  }

  get dateRangeText() {
    const dates = this.dates.map((date) => formatDate(date, "P"));
    return dates.join(" ~ ");
  }

  get gameRulesUrl() {
    return this.getFileUrl(this.game.gameRules);
  }

  public verifyPercentage(): void {
    this.totalPercentage = this.selectedGameGifts.reduce(
      (total, { winPercentage }) => {
        return (total += +winPercentage);
      },
      0
    );
    this.verifiedPercentage = true;
  }

  mounted() {
    this.loading = true;
    this.initialized = false;
    const gameId = +this.$route.params.id;
    this.$store.dispatch("giftStore/fetchAll").then(() => {
      this.currentGame = this.$store.getters["gameStore/getCurrentGame"];
      this.$store
        .dispatch("gameStore/fetchOne", gameId)
        .then((game) => {
          this.game = game;
          this.isUpdatable = !this.game.activated && !this.game.jackpotDraw;
          this.dates = [game.startsOn, game.endsOn];
          if (this.game.gameGifts) {
            this.selectedGameGifts = this.game.gameGifts;
          }
        })
        .finally(() => {
          this.loading = false;
          this.initialized = true;
        });
    });
  }
}
</script>

<style scoped>
.card {
  margin: 2em auto;
}

.gift-select {
  min-width: 70%;
}
</style>
