import { Test, TestingModule } from '@nestjs/testing';
import { TokenTypesController } from './token-types.controller';
import { TokenTypesService } from './token-types.service';

describe('TokenTypesController', () => {
  let controller: TokenTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenTypesController],
      providers: [TokenTypesService],
    }).compile();

    controller = module.get<TokenTypesController>(TokenTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
