import { Injectable } from "@nestjs/common";
import { StudyBoardItemEntity } from "./study-board-item.entity";
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { format } from "date-fns";
import { StudyType } from "./study-type";

interface IStudyBoardItemRepository {
    save({
        userId,
        title,
        content,
        studyType,
        category,
        location,
        numberOfParticipants,
        startDate,
        endDate
    }: SaveStudyBoardItemParams): Promise<void>

    findLatest(): Promise<StudyBoardItemEntity[]>

    findById(userId: string): Promise<StudyBoardItemEntity | null>
}

export interface SaveStudyBoardItemParams {
    userId: string,
    title: string,
    content: string,
    studyType: StudyType,
    category: string,
    location: string,
    numberOfParticipants: number,
    startDate: string,
    endDate: string
}

@Injectable()
export class StudyBoardItemRepository implements IStudyBoardItemRepository {
    dynamoDB: AWS.DynamoDB.DocumentClient
    tableName: string
    pkValue: string
    createdAtIndexName: string

    constructor() {
        if (process.env.NODE_ENV == "local") {
            AWS.config.update({
                credentials: {
                    accessKeyId: process.env.DDB_ACCESS_KEY_ID,
                    secretAccessKey: process.env.DDB_SECRET_ACCESS_KEY
                },
                region: "ap-northeast-2"
            });
        }
        this.dynamoDB = new AWS.DynamoDB.DocumentClient();
        this.tableName = "StudyBoard_v3"
        this.pkValue = "POST"
        this.createdAtIndexName = "createdAt-index"
    }

    async save({
        userId,
        title,
        content,
        studyType,
        category,
        location,
        numberOfParticipants,
        startDate,
        endDate
    }: SaveStudyBoardItemParams): Promise<void> {
        return new Promise(
            (res, rej) => {
                const createdAt = new Date();
                const updatedAt = new Date();
                const id = `${userId}:${createdAt.getTime()}`
                const pk = this.pkValue;

                const item: StudyBoardItemDDBEntity = {
                    pk, id, userId, title, content, studyType, category, location,
                    numberOfParticipants, startDate, endDate,
                    createdAt: createdAt.toISOString(),
                    updatedAt: updatedAt.toISOString()
                }
                this.dynamoDB.put(
                    {
                        TableName: this.tableName,
                        Item: item
                    },
                    (err, data) => {
                        if (err) {
                            console.error("Unable to add a study board item", id, ". Error JSON:", JSON.stringify(err, null, 2));
                            rej(err)
                        } else {
                            console.log("PutItem succeeded:", id)
                            res()
                        }
                    }
                )
            }

        )
    }

    findByUserId(userId: string): Promise<StudyBoardItemEntity[]> {
        return new Promise(
            (res, rej) => {
                this.dynamoDB.query(
                    {
                        TableName: this.tableName,
                        KeyConditionExpression: "pk = :pk and begins_with(id, :beginWithValue)",
                        ExpressionAttributeValues: {
                            ":pk": this.pkValue,
                            ":beginWithValue": `${userId}:`
                        }
                    },
                    (err, data) => {
                        if (err) {
                            console.error("Unable to query study board items by userId", userId, ". Error JSON:", JSON.stringify(err, null, 2));
                            rej(err)
                        } else {
                            console.log("GetItem succeeded:", data)
                            const results: StudyBoardItemEntity[] = data.Items.map(Item => {
                                return {
                                    id: Item.id,
                                    category: Item.category,
                                    userId: Item.userId,
                                    title: Item.title,
                                    content: Item.content,
                                    location: Item.location,
                                    studyType: Item.studyType,
                                    numberOfParticipants: Item.numberOfParticipants,
                                    startDate: Item.startDate,
                                    endDate: Item.endDate,
                                    createdAt: Item.createdAt,
                                    updatedAt: Item.updatedAt
                                }
                            })
                            res(results)
                        }
                    }
                )
            }
        )
    }
    async findLatest(): Promise<StudyBoardItemEntity[]> {
        return new Promise(
            (res, rej) => {
                this.dynamoDB.query(
                    {
                        TableName: this.tableName,
                        IndexName: this.createdAtIndexName,
                        ScanIndexForward: false, //내림차순
                        KeyConditionExpression: "pk = :pk",
                        ExpressionAttributeValues: {
                            ":pk": this.pkValue
                        }
                    },
                    (err, data) => {
                        if (err) {
                            console.error("Unable to query latest study board items", ". Error JSON:", JSON.stringify(err, null, 2));
                            rej(err)
                        } else {
                            console.log("GetItem succeeded:", data)
                            const results: StudyBoardItemEntity[] = data.Items.map(Item => {
                                return {
                                    id: Item.id,
                                    category: Item.category,
                                    userId: Item.userId,
                                    title: Item.title,
                                    content: Item.content,
                                    location: Item.location,
                                    studyType: Item.studyType,
                                    numberOfParticipants: Item.numberOfParticipants,
                                    startDate: Item.startDate,
                                    endDate: Item.endDate,
                                    createdAt: Item.createdAt,
                                    updatedAt: Item.updatedAt
                                }
                            })
                            res(results)
                        }
                    }
                )
            }
        )
    }

    async findById(id: string): Promise<StudyBoardItemEntity | null> {
        return new Promise(
            (res, rej) => {
                this.dynamoDB.get(
                    {
                        TableName: this.tableName,
                        Key: {
                            pk: this.pkValue,
                            id
                        }
                    },
                    (err, data) => {
                        if (err) {
                            console.error("Unable to get a study board item", id, ". Error JSON:", JSON.stringify(err, null, 2));
                            rej(err)
                        } else {
                            console.log("GetItem succeeded:", data)
                            console.log("GetItem succeeded:", !data.Item)
                            if (!data.Item)
                                return res(null)
                            
                            const result: StudyBoardItemEntity = {
                                id: data.Item.id,
                                category: data.Item.category,
                                userId: data.Item.userId,
                                title: data.Item.title,
                                content: data.Item.content,
                                location: data.Item.location,
                                studyType: data.Item.studyType,
                                numberOfParticipants: data.Item.numberOfParticipants,
                                startDate: data.Item.startDate,
                                endDate: data.Item.endDate,
                                createdAt: data.Item.createdAt,
                                updatedAt: data.Item.updatedAt
                            }
                            return res(result)
                        }
                    }
                )
            }
        )
    }
}

interface StudyBoardItemDDBEntity extends StudyBoardItemEntity {
    pk: string
}
