import { Module } from '@nestjs/common';
import { StudyBoardPostsController } from './controller/study-board-posts.controller';
import { StudyBoardPostsService } from './service/study-board-posts.service';
import { StudyBoardPostsRepository } from './domain/study-board-posts.repository';

@Module({
  controllers: [StudyBoardPostsController],
  providers: [StudyBoardPostsService, StudyBoardPostsRepository]
})
export class StudyBoardPostsModule {}
