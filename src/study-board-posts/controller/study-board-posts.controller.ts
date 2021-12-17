import { Body, Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { StudyBoardPostsEntity } from '../domain/study-board-posts.entity';
import { RegisterStudyBoardPostsRequest, StudyBoardPostsService } from '../service/study-board-posts.service';

@Controller('study-board-posts')
export class StudyBoardPostsController {
    constructor(private readonly StudyBoardPostsService: StudyBoardPostsService) { }

    @Post("/register")
    async register(
        @Headers() headers,
        @Body() request: RegisterStudyBoardPostsRequest
    ): Promise<void> {
        console.log(`request: ${JSON.stringify(request, null, 2)}`)
        const userId = headers["study-board-user-id"]
        if (!userId) return

        return this.StudyBoardPostsService.register(userId, request)
    }

    @Get("/latest-posts")
    async getLatest(): Promise<StudyBoardPostsEntity[]> {
        return this.StudyBoardPostsService.getLatestItems();
    }

    @Get("/my-posts")
    async getByUserId(
        @Headers() headers
    ): Promise<StudyBoardPostsEntity[]> {
        const userId = headers["study-board-user-id"]
        if (!userId) return []

        return this.StudyBoardPostsService.getByUserId(userId);
    }

    @Get("/:id")
    async getDetail(
        @Param() params
    ): Promise<StudyBoardPostsEntity> {
        return this.StudyBoardPostsService.getById(params.id);
    }
}
