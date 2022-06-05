<template>
  <v-card
    width="80%"
    :loading="loading"
    loader-height="4"
    class="mx-auto my-2 pa-8"
  >
    <v-card-title> Ajouter un jeu </v-card-title>
    <v-card-text>
      <validation-observer ref="form" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="name"
            rules="required|max:45"
          >
            <v-text-field
              v-model="game.name"
              :error-messages="errors"
              label="Titre"
              required
              outlined
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="description"
            rules="required"
          >
            <v-textarea
              v-model="game.description"
              :error-messages="errors"
              label="Description"
              outlined
              required
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
          <p class="primary--text">
            Choisissez un fichier pdf contenant le réglement du jeu-conours
          </p>

          <validation-provider
            v-slot="{ errors, validate }"
            name="gameRules"
            rules="required|pdf"
          >
            <v-file-input
              v-model="game.gameRules"
              :error-messages="errors"
              label="Règlement du jeu"
              accept=".pdf"
              outlined
              @change="validate"
            ></v-file-input>
          </validation-provider>

          <v-divider class="my-8"></v-divider>
          <p class="primary--text">
            Sélectionnez les cadeaux pour ce jeu et leur pourcentage de gain
          </p>

          <div v-for="(gameGift, index) in selectedGameGifts" :key="index">
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
                  <v-btn icon class="error--text" @click="deleteGift(gameGift)"
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
          <p class="primary--text">Sélectionnez le cadeau jackpot</p>

          <validation-provider
            v-slot="{ errors }"
            name="jackpotGift"
            rules="required"
          >
            <v-select
              v-model="game.jackpotGift"
              :items="jackpotGifts"
              item-text="name"
              item-value="id"
              outlined
              :error-messages="errors"
              label="Jackpot"
            >
            </v-select>
          </validation-provider>
          <v-divider class="my-8"></v-divider>
          <validation-provider v-slot="{ errors }" name="activated">
            <v-checkbox
              v-model="game.activated"
              :error-messages="errors"
              label="Activer ce jeu immédiatement (il ne doit y avoir aucun jeu en cours actuellement)"
              type="checkbox"
              outlined
              :readonly="!canActivateImmediately"
            ></v-checkbox>
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="tickets">
            <v-text-field
              v-model="game.tickets"
              :error-messages="errors"
              label="Combien de tickets voulez-vous générer pour ce jeu ?"
              type="number"
              outlined
            ></v-text-field>
          </validation-provider>
          <span
            class="error--text ma-2"
            v-if="verifiedPercentage && totalPercentage !== 100"
            >Pour valider le jeu, le total des pourcentages de gain des cadeaux
            choisis doit être de 100%</span
          >
          <v-btn color="primary--text" outlined @click="reset">
            Réinitialiser
          </v-btn>
          <v-btn
            class="ma-4"
            color="primary--text accent"
            type="submit"
            :disabled="invalid || loading"
          >
            Sauvegarder
          </v-btn>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { formatDate } from "@/helpers/utils";
import { Game, GameGift, Gift } from "@/models";
import { ValidatorRef } from "@/types/validator";
import { isAfter } from "date-fns";
import { Component, Ref, Vue } from "vue-property-decorator";

@Component
export default class GameCreate extends Vue {
  @Ref("form") readonly form!: ValidatorRef;
  public loading = false;
  public datePickers = {
    menuStartsOn: false,
    menuEndsOn: false,
  };
  public game: Partial<Game> & {
    jackpotGiftId?: number;
    gameRules?: File;
    gameGifts: GameGift[];
  } = {
    name: "",
    startsOn: undefined,
    endsOn: undefined,
    activated: false,
    description: "",
    rulesValidation: 0,

    tickets: 0,
    gameGifts: [],
    jackpotGiftId: 0,
    gameRules: undefined,
  };

  public dates: string[] = [];
  public currentGame: Game | null = null;
  public selectedGameGifts: GameGift[] = [];
  public totalPercentage = 0;
  public verifiedPercentage = false;

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

  public getFullGifts(giftIds: number[]): Gift[] {
    const gifts: Gift[] = [];
    giftIds.forEach((id) => {
      gifts.push(this.$store.getters["giftStore/getOne"](id));
    });
    return gifts;
  }

  public addGift() {
    this.selectedGameGifts.push({ gift: this.gifts[0], winPercentage: 0 });
  }

  public deleteGift(gameGift: GameGift) {
    this.selectedGameGifts = this.selectedGameGifts.filter(
      (gamegift) => gamegift.gift.id !== gameGift.gift.id
    );
  }

  public verifyPercentage(): void {
    this.totalPercentage = this.selectedGameGifts.reduce(
      (total, { winPercentage }) => {
        return (total += +winPercentage);
      },
      0
    );
    this.totalPercentage === 100
      ? (this.verifiedPercentage = true)
      : (this.verifiedPercentage = false);
  }

  async submit(): Promise<void> {
    this.verifyPercentage();
    this.loading = true;
    const isValid = await this.form.validate();
    if (isValid && this.totalPercentage === 100 && this.verifiedPercentage) {
      try {
        this.game.gameGifts = this.selectedGameGifts;
        await this.$store.dispatch("gameStore/create", this.game);
        this.$store.commit("eventStore/add", {
          name: "entityCreated",
        });
        this.$router.push({ name: "games" });
      } catch (error) {
        this.$store.commit("eventStore/add", { name: "error" });
      } finally {
        this.loading = false;
      }
    }
  }

  public setDates(value: string[]) {
    const dates = value.map((d) => new Date(d));
    if (isAfter(dates[0], dates[1])) {
      this.game.startsOn = dates[1];
      this.game.endsOn = dates[0];
    } else {
      this.game.startsOn = dates[0];
      this.game.endsOn = dates[1];
    }
  }

  reset(): void {
    this.game = {
      name: "",
      startsOn: undefined,
      endsOn: undefined,
      activated: false,
      description: "",
      gameRules: undefined,
      rulesValidation: 0,
      gameGifts: [],
    };
    this.form.reset();
  }

  get dateRangeText() {
    const dates = this.dates.map((date) => formatDate(date, "P"));
    return dates.join(" ~ ");
  }

  async mounted() {
    this.currentGame = this.$store.getters["gameStore/currentGame"];
    await this.$store.dispatch("giftStore/fetchAll");
    this.selectedGameGifts.push({ gift: this.gifts[0], winPercentage: 0 });
  }
}
</script>
