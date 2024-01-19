import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StateController],
  providers: [StateService],
  imports: [PrismaModule],
})
export class StateModule {}
