import { IsString, MinLength } from "class-validator";

export class User {
    id?: string;

    @IsString()
    @MinLength(3)
    name?: string;

    @IsString()
    @MinLength(4)
    username?: string;

    @IsString()
    email?: string;

    @IsString()
    password?: string;
}