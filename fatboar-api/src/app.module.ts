import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MulterModule } from "@nestjs/platform-express";
import { Connection } from "typeorm";
import { AuthenticationModule } from "./authentication/authentication.module";
import { CashRegistersModule } from "./cash-registers/cash-registers.module";
import { DatabaseModule } from "./database/database.module";
import { EmailingListUserModule } from "./emailing-list-user/emailing-list-user.module";
import { EmailingListModule } from "./emailing-list/emailing-list.module";
import { FileDownloaderModule } from "./file-downloader/file-downloader.module";
import { GameGiftModule } from "./game-gift/game-gift.module";
import { GamesModule } from "./games/games.module";
import { GiftsModule } from "./gifts/gifts.module";
import { MailsModule } from './mails/mails.module';
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { RolesModule } from "./roles/roles.module";
import { TokenTypesModule } from "./token-types/token-types.module";
import { TokensModule } from "./tokens/tokens.module";
import { UsersModule } from "./users/users.module";
import { WinningTicketsModule } from "./winning-tickets/winning-tickets.module";

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register(),
    UsersModule,
    RolesModule,
    CashRegistersModule,
    EmailingListModule,
    EventEmitterModule.forRoot(),
    RestaurantsModule,
    GiftsModule,
    GamesModule,
    GameGiftModule,
    WinningTicketsModule,
    EmailingListUserModule,
    AuthenticationModule,
    TokensModule,
    TokenTypesModule,
    FileDownloaderModule,
    MailsModule   
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
