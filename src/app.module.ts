import { Module } from '@nestjs/common';
import { HelloController } from './controller/HelloController';
import { StudyBoardItemQueryController } from './controller/StudyBoardItemQueryController';
import StudyBoardItemRepository from './domain/StudyBoardItemRepository';
import { HelloService } from './service/HelloService';
import { StudyBoardItemQueryService } from './service/StudyBoardItemQueryService';

@Module({
  imports: [],
  controllers: [HelloController, StudyBoardItemQueryController],
  providers: [HelloService, StudyBoardItemQueryService, StudyBoardItemRepository],
  exports: [StudyBoardItemQueryService]
})
export class AppModule {}
