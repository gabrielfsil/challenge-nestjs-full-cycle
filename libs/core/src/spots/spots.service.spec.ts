import { Test, TestingModule } from '@nestjs/testing';
import { SpotsService } from './spots.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('SpotsService', () => {
  let service: SpotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [SpotsService],
    }).compile();

    service = module.get<SpotsService>(SpotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
