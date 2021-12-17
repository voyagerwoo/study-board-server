import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Request } from 'express';
import { StudyBoardItemEntity } from './domain/study-board-item.entity';
import { RegisterStudyBoardItemRequest, StudyBoardItemService } from './service/study-board-item.service';

@Controller('study-board-items')
export class StudyBoardItemController {
    constructor(private readonly studyBoardItemService: StudyBoardItemService) { }

    @Get("/latest")
    async getLatest(): Promise<StudyBoardItemEntity[]> {
        return this.studyBoardItemService.getLatestItems();
    }

    @Get("/:id")
    async getDetail(
        @Param() params
    ): Promise<StudyBoardItemEntity> {
        return this.studyBoardItemService.getById(params.id);
    }

    @Get("/by-user-id/:userId")
    async getByUserId(
        @Param() params
    ): Promise<StudyBoardItemEntity[]> {
        return this.studyBoardItemService.getByUserId(params.userId);
    }

    @Post("/register")
    async register(
        @Query() query,
        @Body() request: RegisterStudyBoardItemRequest
    ): Promise<void> {
        console.log(`request: ${JSON.stringify(request, null, 2)}`)
        return this.studyBoardItemService.register(query.userId, request)
    }
}
