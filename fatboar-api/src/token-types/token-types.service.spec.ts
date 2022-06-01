import { Test, TestingModule } from '@nestjs/testing';
import { TokenTypesService } from './token-types.service';

describe('TokenTypesService', () => {
  let service: TokenTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenTypesService],
    }).compile();

    service = module.get<TokenTypesService>(TokenTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
