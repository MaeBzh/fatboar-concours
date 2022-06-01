import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailingListModule } from "./../emailing-list/emailing-list.module";
import { UsersModule } from "./../users/users.module";
import { EmailingListUserService } from "./emailing-list-user.service";
import { EmailingListUser } from "./entities/emailing-list-user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailingListUser]),
    UsersModule,
    EmailingListModule,
  ],
  providers: [EmailingListUserService],
  exports: [EmailingListUserService],
})
export class EmailingListUserModule {}
