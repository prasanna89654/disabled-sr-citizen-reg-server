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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocalService } from './local.service';
import { CreateOrEditLocalDto } from './dto/create-local.dto';
import { SortOrder, CommonQuery } from 'src/interface/query.interface';

@ApiTags('Local Level')
@Controller('Local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Post('CreateOrEdit')
  upsert(@Body() createOrEditLocalDto: CreateOrEditLocalDto) {
    return this.localService.upsert(createOrEditLocalDto);
  }

  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'orderBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false, enum: SortOrder })
  @Get('GetAllLocals')
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
    return this.localService.findAll(query);
  }

  @ApiQuery({ name: 'id', required: true })
  @Get('GetLocal')
  findOne(@Query('id') id: number) {
    return this.localService.findOne(+id);
  }

  @ApiQuery({ name: 'id', required: true })
  @Delete('DeleteLocal')
  remove(@Query('id') id: number) {
    return this.localService.remove(+id);
  }
}
