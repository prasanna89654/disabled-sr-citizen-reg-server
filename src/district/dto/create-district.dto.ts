import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrEditDistrictDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  state_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nepali_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  english_name: string;
}
