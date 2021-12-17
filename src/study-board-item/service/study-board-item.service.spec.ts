import { Test, TestingModule } from '@nestjs/testing';
import { StudyBoardItemService } from './study-board-item.service';

describe('StudyBoardItemService', () => {
  let service: StudyBoardItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyBoardItemService],
    }).compile();

    service = module.get<StudyBoardItemService>(StudyBoardItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
