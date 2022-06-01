import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenTypesModule } from "./../token-types/token-types.module";
import { Token } from "./entities/token.entity";
import { TokensService } from "./tokens.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.register({
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      secretOrPrivateKey: process.env.JWT_SECRET,
    }),    
    TokenTypesModule,
  ],
  providers: [TokensService, JwtModule],
  exports: [TokensService],
})
export class TokensModule {}
