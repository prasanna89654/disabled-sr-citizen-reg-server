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
import { StateService } from './state.service';
import { CreateOrEditStateDto } from './dto/create-state.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SortOrder, CommonQuery } from 'src/interface/query.interface';

@ApiTags('State Level')
@Controller('State')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post('CreateOrEdit')
  upsert(@Body() createOrEditStateDto: CreateOrEditStateDto) {
    return this.stateService.upsert(createOrEditStateDto);
  }

  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'orderBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false, enum: SortOrder })
  @Get('GetAllStates')
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
    return this.stateService.findAll(query);
  }

  @ApiQuery({ name: 'id', required: true })
  @Get('GetState')
  findOne(@Query('id') id: number) {
    return this.stateService.findOne(+id);
  }

  @ApiQuery({ name: 'id', required: true })
  @Delete('DeleteState')
  remove(@Query('id') id: number) {
    return this.stateService.remove(+id);
  }
}
