import { Test, TestingModule } from '@nestjs/testing';
import { StudyBoardPostsController } from './study-board-posts.controller';

describe('StudyBoardPostsController', () => {
  let controller: StudyBoardPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyBoardPostsController],
    }).compile();

    controller = module.get<StudyBoardPostsController>(StudyBoardPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
