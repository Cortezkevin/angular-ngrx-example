export class ResponseDto<T> {
    message: string;
    content: T;

    constructor(message: string, content: T){
        this.message = message;
        this.content = content;
    }
}
