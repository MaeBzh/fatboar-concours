import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { TokenType } from "./../token-types/entities/token-type.entity";
import { TokenTypesService } from "./../token-types/token-types.service";
import { TokenRepositoryMock } from "./tokens.repository.mock";
import { TokensService } from "./tokens.service";

describe("TokensService", () => {
  let tokenService: TokensService;
  let tokenTypesService: TokenTypesService;
  let repo: TokenRepositoryMock;
  let jwtService: JwtService;

  const database = {
    tokens: [
      {
        id: 1,
        value: "azertyui",
        isRevoked: false,
        expiresIn: new Date(),
        tokenType: {} as TokenType,
        user: {} as User,
      },
    ],
  };

  beforeEach(async () => {
    repo = new TokenRepositoryMock(database);
    tokenService = new TokensService(repo, tokenTypesService, jwtService);
  });

  it("should be defined", () => {
    expect(tokenService).toBeDefined();
  });
});
