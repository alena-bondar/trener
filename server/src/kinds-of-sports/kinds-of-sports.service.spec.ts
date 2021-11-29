import { Test, TestingModule } from '@nestjs/testing';
import { KindsOfSportsService } from './kinds-of-sports.service';

describe('KindsOfSportsService', () => {
  let service: KindsOfSportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KindsOfSportsService],
    }).compile();

    service = module.get<KindsOfSportsService>(KindsOfSportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
