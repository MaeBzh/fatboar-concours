import { CashRegistersModule } from './../cash-registers/cash-registers.module';
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtConfig, PassportConfig } from "src/authconfig";
import { MailsModule } from "src/mails/mails.module";
import { TokensModule } from "src/tokens/tokens.module";
import { UsersModule } from "../users/users.module";
import { RolesModule } from "./../roles/roles.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { CashRegisterStrategy } from "./strategies/cash-register.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    UsersModule,
    RolesModule,
    TokensModule,
    CashRegistersModule,
    JwtModule.register(JwtConfig),
    PassportModule.register(PassportConfig),
    MailsModule,
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    CashRegisterStrategy,
  ],
  controllers: [AuthenticationController],
  exports: [AuthenticationService, JwtModule, JwtStrategy, CashRegisterStrategy, PassportModule],
})
export class AuthenticationModule {}
