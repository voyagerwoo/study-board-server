import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudyBoardPostsModule } from './study-board-posts/study-board-posts.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env.local",
    ignoreEnvFile: process.env.NODE_ENV == 'prod'
  }), StudyBoardPostsModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
