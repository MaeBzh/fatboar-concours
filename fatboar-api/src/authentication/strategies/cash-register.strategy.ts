import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { AuthenticationService } from "../authentication.service";
import { RequestWithCashRegister } from './../interfaces/request-with-user.interface';

@Injectable()
export class CashRegisterStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  "cashregister"
) {
  constructor(private readonly authService: AuthenticationService) {
    super(
      {
        header: "Authorization",
        prefix: "Api-Key ",
      },
      true,
      async (apiKey, verified, req) => this.validate(apiKey, verified, req)
    );
  }

  async validate(
    token: string,
    verified: (error: Error, data) => {},
    req: RequestWithCashRegister
  ): Promise<any> {
    try {
      const cashRegister = await this.authService.validateCashRegister(token);

      req.cashRegister = cashRegister;

      return verified(null, cashRegister);
    } catch (error) {
      return verified(new UnauthorizedException(), null);
    }
  }
}
