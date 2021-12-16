import { Injectable } from '@nestjs/common';
import { StudyBoardItem } from '../domain/StudyBoardItem';
import StudyBoardItemRepository from '../domain/StudyBoardItemRepository';

@Injectable()
export class StudyBoardItemQueryService {
    constructor(private readonly repository: StudyBoardItemRepository) { }
    
    async getLatesItems(): Promise<StudyBoardItem[]> {
        return this.repository.findLatest();
    }

    async getById(id: string): Promise<StudyBoardItem> {
        return this.repository.findById(id)
    }
}
