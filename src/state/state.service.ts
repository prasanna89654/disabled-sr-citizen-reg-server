import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrEditStateDto } from './dto/create-state.dto';
import { State } from '@prisma/client';
import { CommonQuery } from 'src/interface/query.interface';
import {
  ConflictException,
  NotFoundException,
} from 'src/exception/http-exceptions';

@Injectable()
export class StateService {
  constructor(private readonly prismaService: PrismaService) {}

  async upsert(createOrEditStateDto: CreateOrEditStateDto): Promise<State> {
    if (!createOrEditStateDto.id) {
      await this.checkIfStateAlreadyExists(createOrEditStateDto);
      return this.prismaService.state.create({
        data: createOrEditStateDto,
      });
    }

    await this.checkIfStateExists(createOrEditStateDto.id);
    await this.checkIfStateAlreadyExists(createOrEditStateDto);
    return this.prismaService.state.update({
      where: {
        id: createOrEditStateDto.id,
      },
      data: createOrEditStateDto,
    });
  }

  async findAll(query: CommonQuery) {
    const searchItems = [
      {
        nepali_name: {
          contains: query.search,
        },
      },
      {
        english_name: {
          contains: query.search,
        },
      },
    ];

    const states = await this.prismaService.state.findMany({
      where: {
        OR: searchItems,
      },
      skip: query.skip,
      take: query.take,
      orderBy: {
        [query.orderBy]: query.sortOrder,
      },
    });

    const totalCount = states.length;

    return { totalCount, states };
  }

  async findOne(id: number) {
    await this.checkIfStateExists(id);
    return this.prismaService.state.findUnique({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    await this.checkIfStateExists(id);
    return this.prismaService.state.delete({
      where: {
        id: id,
      },
    });
  }

  async checkIfStateExists(id: number) {
    const state = await this.prismaService.state.findUnique({
      where: {
        id: id,
      },
    });
    if (!state) {
      throw new NotFoundException('प्रदेश भेटिएन');
    }
  }

  async checkIfStateAlreadyExists(createOrEditStateDto: CreateOrEditStateDto) {
    const state = await this.prismaService.state.findFirst({
      where: {
        OR: [
          {
            nepali_name: {
              equals: createOrEditStateDto.nepali_name,
            },
          },
          {
            english_name: {
              equals: createOrEditStateDto.english_name,
            },
          },
        ],
      },
    });
    if(!state) return;

    if (createOrEditStateDto.id) {
      if (state.id === createOrEditStateDto.id) return;
    }

    throw new ConflictException('प्रदेश पहिला नै रेजिस्टर्ड छ');
  
  }
}
