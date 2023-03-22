import { UserDto } from "./user-dto";

export class JwtDto {
    user: UserDto;
    token: string;

    constructor(user: UserDto, token: string){
        this.user = user;
        this.token = token;
    }
}
