import { StudyType } from "./study-type";

export interface StudyBoardPostsEntity {
    id: string;
    userId: string;
    title: string;
    content: string;
    studyType: StudyType;
    category: string;
    location: string;
    numberOfParticipants: number;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string; 
}