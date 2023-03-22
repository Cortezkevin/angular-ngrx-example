import { ChangePasswordDto } from 'src/app/model/change-password-dto';
import { NewUserDto } from 'src/app/model/new-user-dto';
import { UserDto } from 'src/app/model/user-dto';

// LOAD USER

export interface LoadUserSuccessAction {
    user: UserDto;
}

export interface LoadUserErrorAction {
    message: string;
}

// LOGIN USER

export interface LoginStartAction {
    username: string;
    password: string;
}

export interface LoginSuccessAction {
    user: UserDto;
    message: string;
}

export interface LoginErrorAction {
    message: string;
}

// REGISTER USER

export interface RegisterStartAction {
    newUserDto: NewUserDto
}

export interface RegisterSuccessAction {
    user: UserDto;
    message: string;
}

export interface RegisterErrorAction {
    message: string;
}

// FORGOT PASSWORD

export interface ForgotPasswordStartAction {
    email: string;
}

export interface ForgotPasswordSuccessAction {
    message: string;
}

export interface ForgotPasswordErrorAction {
    message: string;
}

// CHANGE PASSWORD

export interface ChangePasswordStartAction {
    changePasswordDto: ChangePasswordDto;
}

export interface ChangePasswordSuccessAction {
    message: string;
}

export interface ChangePasswordErrorAction {
    message: string;
}