import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrEditUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  role_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  password?: string;
}
