import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudyBoardItemModule } from './study-board-item/study-board-item.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env.local",
    ignoreEnvFile: process.env.NODE_ENV == 'prod'
  }), StudyBoardItemModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
