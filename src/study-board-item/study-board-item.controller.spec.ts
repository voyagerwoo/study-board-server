import { Test, TestingModule } from '@nestjs/testing';
import { StudyBoardItemController } from './study-board-item.controller';

describe('StudyBoardItemController', () => {
  let controller: StudyBoardItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyBoardItemController],
    }).compile();

    controller = module.get<StudyBoardItemController>(StudyBoardItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
