import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { isToday, isYesterday } from "date-fns";
import { GamesService } from "../games/games.service";

@Injectable()
export class GameTask {
  constructor(private gameService: GamesService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handleCron() {
    this.endGame().then(() => this.startGame());
  }

  protected async endGame(): Promise<void> {
    const currentGame = await this.gameService.findCurrentGame();
    if (currentGame) {
      if (isYesterday(new Date(currentGame.endsOn))) {
        this.gameService.updateGameActivation(currentGame.id, false);
      }
    }
  }

  protected async startGame(): Promise<void> {
    const currentGame = await this.gameService.findCurrentGame();
    if (!currentGame) {
      const games = await this.gameService.findAll();
      games.every((game) => {
        if (isToday(new Date(game.startsOn))) {
          this.gameService.updateGameActivation(game.id, true);
          return false; // break loop
        }

        return true; // continue loop
      });
    }
  }
}
