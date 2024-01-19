import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrEditRoleDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
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
