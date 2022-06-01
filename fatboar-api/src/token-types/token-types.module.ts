import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from './../authentication/authentication.module';
import { Module } from '@nestjs/common';
import { TokenTypesService } from './token-types.service';
import { TokenTypesController } from './token-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenType } from './entities/token-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenType])],
  controllers: [TokenTypesController],
  providers: [TokenTypesService],
  exports: [TokenTypesService]
})
export class TokenTypesModule {}
