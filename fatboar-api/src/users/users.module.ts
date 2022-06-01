import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesModule } from "src/roles/roles.module";
import { User } from "../users/entities/user.entity";
import { UsersController } from "../users/users.controller";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
