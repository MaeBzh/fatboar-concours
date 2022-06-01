import { JwtModuleOptions } from "@nestjs/jwt";
import { IAuthModuleOptions } from "@nestjs/passport";

export const JwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};

export const PassportConfig: IAuthModuleOptions = { defaultStrategy: 'jwt' };

