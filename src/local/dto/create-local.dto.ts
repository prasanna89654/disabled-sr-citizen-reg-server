import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum local_level_type {
  vdc = 'vdc',
  municipality = 'municipality',
  sub_metropolitan = 'sub_metropolitan',
  metropolitan = 'metropolitan',
}

export class CreateOrEditLocalDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  district_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nepali_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  english_name: string;

  @ApiProperty({ enum: local_level_type })
  @IsNotEmpty()
  @IsEnum(local_level_type)
  type: local_level_type;
}
