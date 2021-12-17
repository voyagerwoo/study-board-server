import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { StudyBoardItemEntity } from '../domain/study-board-item.entity'
import { StudyBoardItemRepository } from '../domain/study-board-item.repository'
import { StudyType } from '../domain/study-type';

@Injectable()
export class StudyBoardItemService {
    constructor(private readonly repository: StudyBoardItemRepository) { }

    async register(userId: string, request: RegisterStudyBoardItemRequest): Promise<void> {
        return this.repository.save({
            userId,
            ...request
        })
    }

    async getLatestItems(): Promise<StudyBoardItemEntity[]> {
        return this.repository.findLatest();
    }

    async getByUserId(userId: string): Promise<StudyBoardItemEntity[]> {
        return this.repository.findByUserId(userId);
    }

    async getById(id: string): Promise<StudyBoardItemEntity> {
        return this.repository.findById(id)
    }
}

export interface RegisterStudyBoardItemRequest {
    readonly title: string;
    readonly content: string;
    readonly studyType: StudyType;
    readonly category: string;
    readonly location: string;
    readonly numberOfParticipants: number;
    readonly startDate: string;
    readonly endDate: string;
}