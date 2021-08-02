import { Test, TestingModule } from '@nestjs/testing';
import { BipService } from './bip.service';

describe('BipService', () => {
  let service: BipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BipService],
    }).compile();

    service = module.get<BipService>(BipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
