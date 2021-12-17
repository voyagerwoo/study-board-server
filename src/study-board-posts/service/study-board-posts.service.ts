import { Injectable } from '@nestjs/common';
import { StudyBoardPostsEntity } from '../domain/study-board-posts.entity'
import { StudyBoardPostsRepository } from '../domain/study-board-posts.repository'
import { StudyType } from '../domain/study-type';

@Injectable()
export class StudyBoardPostsService {
    constructor(private readonly repository: StudyBoardPostsRepository) { }

    async register(userId: string, request: RegisterStudyBoardPostsRequest): Promise<void> {
        return this.repository.save({
            userId,
            ...request
        })
    }

    async getLatestItems(): Promise<StudyBoardPostsEntity[]> {
        return this.repository.findLatest();
    }

    async getByUserId(userId: string): Promise<StudyBoardPostsEntity[]> {
        return this.repository.findByUserId(userId);
    }

    async getById(id: string): Promise<StudyBoardPostsEntity> {
        return this.repository.findById(id)
    }
}

export interface RegisterStudyBoardPostsRequest {
    readonly title: string;
    readonly content: string;
    readonly studyType: StudyType;
    readonly category: string;
    readonly location: string;
    readonly numberOfParticipants: number;
    readonly startDate: string;
    readonly endDate: string;
}