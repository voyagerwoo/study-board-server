import { Module } from '@nestjs/common';
import { StudyBoardItemController } from './study-board-item.controller';
import { StudyBoardItemService } from './service/study-board-item.service';
import { StudyBoardItemRepository } from './domain/study-board-item.repository';

@Module({
  controllers: [StudyBoardItemController],
  providers: [StudyBoardItemService, StudyBoardItemRepository]
})
export class StudyBoardItemModule {}
