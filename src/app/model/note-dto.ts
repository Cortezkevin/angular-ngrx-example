export class NoteDto {
    id: string;
    userId: string;
    title: string;
    body: string;
    createdAt: number;
    updateAt: number;

    constructor(id: string, userId: string, title: string, body: string, createdAt: number, updateAt: number ){
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.body = body;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
    }
}
