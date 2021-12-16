import { type } from "os";

export interface StudyBoardItem {
    id: string;
    title: string;
    content: string;
    studyType: StudyCategory;
    category: string;
    location: string;
    numberOfParticipants: number;
    startDate: string;
    endDate: string;
    createdAt: Date;
    updatedAt: Date;
}

export type StudyCategory = 'ONLINE' | 'OFFLINE' | 'HYBRID' 