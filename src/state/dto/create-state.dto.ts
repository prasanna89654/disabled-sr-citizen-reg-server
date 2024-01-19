import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrEditStateDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nepali_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  english_name: string;
}

