import { Controller, Get, Param } from '@nestjs/common';
import { StudyBoardItem } from '../domain/StudyBoardItem';
import { StudyBoardItemQueryService } from '../service/StudyBoardItemQueryService';

@Controller("study-board-item")
export class StudyBoardItemQueryController {
  constructor(private readonly queryService: StudyBoardItemQueryService) {}

  @Get("/latest")
  async getLatest(): Promise<StudyBoardItem[]> {
    return this.queryService.getLatesItems();
  }

  @Get("/:id")
  async getDetail(@Param() params): Promise<StudyBoardItem> {
    return this.queryService.getById(params.id);
  }
}