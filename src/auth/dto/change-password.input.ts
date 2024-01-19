import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChangePasswordInput {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    old_password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    new_password: string;
}