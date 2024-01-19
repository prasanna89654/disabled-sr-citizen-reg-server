import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './dto/login.response';
import { CreateOrEditUserDto } from './dto/user.dto';
import { SortOrder, CommonQuery } from 'src/interface/query.interface';
import { User } from '@prisma/client';
import { ChangePasswordInput } from './dto/change-password.input';

@ApiTags('User')
@Controller('User')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('Login')
  login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('CreateOrEdit')
  upsert(@Body() registerDto: CreateOrEditUserDto) {
    return this.authService.upsert(registerDto);
  }

  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'orderBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false, enum: SortOrder })
  @Get('GetAllUsers')
  findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: string,
    @Query('sortOrder') sortOrder?: SortOrder,
  ) {
    const query: CommonQuery = {
      skip: +skip || 0,
      take: +take || 25,
      search: search || '',
      orderBy: orderBy || 'created_at',
      sortOrder: sortOrder || SortOrder.DESC,
    };
    return this.authService.findAll(query);
  }

  @ApiQuery({ name: 'id', required: true })
  @Get('GetUser')
  findOne(@Query('id') id: number) {
    return this.authService.findOne(+id);
  }

  @ApiQuery({ name: 'id', required: true })
  @Delete('DeleteUser')
  remove(@Query('id') id: number) {
    return this.authService.remove(+id);
  }

  @Post('ChangePassword')
  changePassword(@Body() changePasswordInput: ChangePasswordInput) {
    return this.authService.changePassword(changePasswordInput);
  }
}
