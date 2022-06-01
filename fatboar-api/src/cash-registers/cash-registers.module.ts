import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CashRegistersController } from "../cash-registers/cash-registers.controller";
import { CashRegistersService } from "../cash-registers/cash-registers.service";
import { CashRegister } from "../cash-registers/entities/cash-register.entity";
import { RestaurantsModule } from "./../restaurants/restaurants.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([CashRegister]),
    RestaurantsModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [CashRegistersController],
  providers: [CashRegistersService],
  exports: [CashRegistersService],
})
export class CashRegistersModule {}
