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
import { RoleService } from './role.service';
import { CreateOrEditRoleDto } from './dto/create-update-role.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { skip, take } from 'rxjs';
import { CommonQuery, SortOrder } from 'src/interface/query.interface';

@ApiTags('Role')
@Controller('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('CreateOrEdit')
  upsert(@Body() createOrEditRoleDto: CreateOrEditRoleDto) {
    return this.roleService.upsert(createOrEditRoleDto);
  }

  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'orderBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false, enum: SortOrder })
  @Get('GetAllRoles')
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
    return this.roleService.findAll(query);
  }

  @ApiQuery({ name: 'id', required: true })
  @Get('GetRole')
  findOne(@Query('id') id: number) {
    return this.roleService.findOne(+id);
  }

  @ApiQuery({ name: 'id', required: true })
  @Delete('DeleteRole')
  remove(@Query('id') id: number) {
    return this.roleService.remove(+id);
  }
}
