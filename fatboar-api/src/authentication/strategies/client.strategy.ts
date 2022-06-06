import { UsersService } from "../../users/users.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class ClientStrategy extends PassportStrategy(Strategy, "client") {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<any> {
    try {
      const { sub } = payload;
      console.log({payload, sub});

      const user = await this.usersService.findOne(sub, {
        relations: ["role"],
      });
      if (user.role.name !== "client") throw new UnauthorizedException();

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
