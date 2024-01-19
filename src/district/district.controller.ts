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
import { DistrictService } from './district.service';
import { CreateOrEditDistrictDto } from './dto/create-district.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SortOrder, CommonQuery } from 'src/interface/query.interface';

@ApiTags('District Level')
@Controller('District')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post('CreateOrEdit')
  upsert(@Body() createOrEditDistrictDto: CreateOrEditDistrictDto) {
    return this.districtService.upsert(createOrEditDistrictDto);
  }

  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'orderBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false, enum: SortOrder })
  @Get('GetAllDistricts')
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
    return this.districtService.findAll(query);
  }

  @ApiQuery({ name: 'id', required: true })
  @Get('GetDistrict')
  findOne(@Query('id') id: number) {
    return this.districtService.findOne(+id);
  }

  @ApiQuery({ name: 'id', required: true })
  @Delete('DeleteDistrict')
  remove(@Query('id') id: number) {
    return this.districtService.remove(+id);
  }
}
