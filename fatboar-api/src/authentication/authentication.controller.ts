import {
  ResetPasswordDto,
  SendResetPasswordDto,
} from "./dto/resetPassword.dto";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiCreatedResponse } from "@nestjs/swagger";
import { UpdateResult } from "typeorm";
import { User } from "./../users/entities/user.entity";
import { AuthenticationService } from "./authentication.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { RegisterSocialDto } from "./dto/registerSocial.dto";
import { LocalGuard } from "./guards/local-authentication.guard";
import { RequestWithUser } from "./interfaces/request-with-user.interface";

@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}  

  @Post("register")
  @ApiCreatedResponse({
    description: "The account has been successfully created",
    type: User,
  })
  async register(@Body() registerDto: RegisterDto) {
    const { password, accountToken, ...user } =
      await this.authenticationService.register(registerDto);
    return user;
  }

  @Post("login")
  @ApiCreatedResponse({
    description: "The user has been successfully login",
    type: User,
  })
  @UseGuards(LocalGuard)
  @ApiBody({ type: LoginDto })
  async login(@Request() req: RequestWithUser) {
    const { accessToken, refreshToken, user } =
      await this.authenticationService.login(req.user);
    const { password, accountToken, ...authUser } = user;

    return { user: authUser, accessToken, refreshToken };
  }

  @Get("activateAccount/:token")
  @ApiCreatedResponse({
    description: "The account has been successfully activated",
    type: User,
  })
  async activateAccount(@Param("token") token: string): Promise<UpdateResult> {
    return this.authenticationService.activateAccount(token);
  }

  @Post("resetPassword/send")
  async sendResetPassword(
    @Body() sendResetPasswordDto: SendResetPasswordDto
  ): Promise<void> {
    return this.authenticationService.sendResetPassword(sendResetPasswordDto);
  }

  @Post("resetPassword")
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto
  ): Promise<void> {
    return this.authenticationService.resetPassword(resetPasswordDto);
  }

  @Post("login/social")
  @ApiCreatedResponse({
    description: "The user has been successfully login",
    type: User,
  })
  @ApiBody({ type: String })
  async socialLogin(@Body() email: string) {
    return this.authenticationService.findByEmail(email);
  }

  @Post("register/social")
  async facebookRegister(@Body() user: RegisterSocialDto) {
    return this.authenticationService.registerSocialUser(user);
  }
}
