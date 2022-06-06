import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtConfig, PassportConfig } from "../authconfig";
import { MailsModule } from "../mails/mails.module";
import { TokensModule } from "../tokens/tokens.module";
import { UsersModule } from "../users/users.module";
import { CashRegistersModule } from "./../cash-registers/cash-registers.module";
import { RolesModule } from "./../roles/roles.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { AdminStrategy } from "./strategies/admin.strategy";
import { CashRegisterStrategy } from "./strategies/cash-register.strategy";
import { ClientStrategy } from "./strategies/client.strategy";
import { EmployeeStrategy } from "./strategies/employee.strategy";
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
    AdminStrategy,
    ClientStrategy,
    EmployeeStrategy,
  ],
  controllers: [AuthenticationController],
  exports: [
    AuthenticationService,
    JwtModule,
    JwtStrategy,
    CashRegisterStrategy,
    AdminStrategy,
    ClientStrategy,
    EmployeeStrategy,
    PassportModule,
  ],
})
export class AuthenticationModule {}
