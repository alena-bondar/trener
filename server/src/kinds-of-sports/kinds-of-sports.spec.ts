import { Test, TestingModule } from '@nestjs/testing';
import { KindsOfSportsController } from './post.controller';
import { KindsOfSportsService } from './kinds-of-sports.service';

describe('KindsOfSportsController', () => {
  let controller: KindsOfSportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KindsOfSportsController],
      providers: [KindsOfSportsService],
    }).compile();

    controller = module.get<KindsOfSportsController>(KindsOfSportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
