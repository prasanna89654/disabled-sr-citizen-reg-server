import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class LoginResponse {
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    access_token: string;

    @IsString()
    @IsNotEmpty()
    role: string;
    
}
