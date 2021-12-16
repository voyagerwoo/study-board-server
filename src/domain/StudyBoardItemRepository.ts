import { Injectable } from "@nestjs/common";
import { StudyBoardItem } from "./StudyBoardItem";
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Injectable()
export default class StudyBoardItemRepository {
    

    async findLatest(): Promise<StudyBoardItem[]> {
        return [
            {
                id: "test-id-1",
                category: "IT",
                title: "스터디합시다!",
                content: "스터디 내용입니당!",
                location: "ONLINE",
                studyType: "ONLINE",
                numberOfParticipants: 5,
                startDate: "2021-10-10",
                endDate: "2021-10-20",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "test-id-2",
                category: "IT",
                title: "스터디합시다!",
                content: "스터디 내용입니당!",
                location: "ONLINE",
                studyType: "ONLINE",
                numberOfParticipants: 5,
                startDate: "2021-10-10",
                endDate: "2021-10-20",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "test-id-3",
                category: "IT",
                title: "스터디합시다!",
                content: "스터디 내용입니당!",
                location: "ONLINE",
                studyType: "ONLINE",
                numberOfParticipants: 5,
                startDate: "2021-10-10",
                endDate: "2021-10-20",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]
    }

    save(item: StudyBoardItem): void {
        throw new Error("Method not implemented.");
    }
    findById(id: string): StudyBoardItem {
        console.log(`id: ${id}`)
        return {
            id: "test-id",
            category: "IT",
            title: "스터디합시다!",
            content: "스터디 내용입니당!",
            location: "ONLINE",
            studyType: "ONLINE",
            numberOfParticipants: 5,
            startDate: "2021-10-10",
            endDate: "2021-10-20",
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }

}