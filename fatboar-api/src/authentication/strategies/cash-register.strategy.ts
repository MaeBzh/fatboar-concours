import { RequestWithCashRegister } from './../interfaces/request-with-user.interface';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { AuthenticationService } from "../authentication.service";
import { CashRegister } from "./../../cash-registers/entities/cash-register.entity";

@Injectable()
export class CashRegisterStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  "cashregister"
) {
  constructor(private readonly authService: AuthenticationService) {
    super({
        header: "Authorization",
        prefix: "Api-Key ",
    }, true, async (apiKey, verified, req) => this.validate(apiKey, verified, req));
  }

  async validate(token: string, verified: (error: Error, data) => {}, req: RequestWithCashRegister): Promise<any> {
    const cashRegister = await this.authService.validateCashRegister(token);
    if(!cashRegister) {
        return verified(new UnauthorizedException(), null);
    }

    req.cashRegister = cashRegister;

    return verified(null, cashRegister);
  }
}
