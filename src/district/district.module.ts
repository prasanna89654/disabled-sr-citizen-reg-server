import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DistrictController } from './district.controller';

@Module({
  controllers: [DistrictController],
  providers: [DistrictService],
  imports: [PrismaModule],
})
export class DistrictModule {}
