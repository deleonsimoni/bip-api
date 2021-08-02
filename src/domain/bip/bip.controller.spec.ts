import { Test, TestingModule } from '@nestjs/testing';
import { BipController } from './bip.controller';
import { BipService } from './bip.service';

describe('BipController', () => {
  let controller: BipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BipController],
      providers: [BipService],
    }).compile();

    controller = module.get<BipController>(BipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
