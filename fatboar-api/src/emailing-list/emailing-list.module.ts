import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailingListController } from "./emailing-list.controller";
import { EmailingListService } from "./emailing-list.service";
import { EmailingList } from "./entities/emailing-list.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailingList]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [EmailingListController],
  providers: [EmailingListService],
  exports: [EmailingListService],
})
export class EmailingListModule {}
