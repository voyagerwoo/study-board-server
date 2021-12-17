import { Test, TestingModule } from '@nestjs/testing';
import { StudyBoardPostsService } from './study-board-posts.service';

describe('StudyBoardPostsService', () => {
  let service: StudyBoardPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyBoardPostsService],
    }).compile();

    service = module.get<StudyBoardPostsService>(StudyBoardPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
