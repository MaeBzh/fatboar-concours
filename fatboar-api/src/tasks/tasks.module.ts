import { Module } from "@nestjs/common";
import { GamesModule } from "src/games/games.module";
import { GameTask } from "./games.task";

@Module({
  imports: [GamesModule],
  providers: [GameTask],
})
export class TasksModule {}
