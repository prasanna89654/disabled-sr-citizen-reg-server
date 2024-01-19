import { Injectable } from '@nestjs/common';
import { District } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrEditDistrictDto } from './dto/create-district.dto';
import { CommonQuery } from 'src/interface/query.interface';
import {
  ConflictException,
  NotFoundException,
} from 'src/exception/http-exceptions';

@Injectable()
export class DistrictService {
  constructor(private readonly prismaService: PrismaService) {}

  async upsert(
    createOrEditDistrictDto: CreateOrEditDistrictDto,
  ): Promise<District> {
    await this.checkIfStateExists(createOrEditDistrictDto.state_id);
    await this.checkIfDistrictAlreadyExists(createOrEditDistrictDto);
    if (!createOrEditDistrictDto.id) {
      return this.prismaService.district.create({
        data: createOrEditDistrictDto,
      });
    }

    await this.checkIfDistrictExists(createOrEditDistrictDto.id);
    return this.prismaService.district.update({
      where: {
        id: createOrEditDistrictDto.id,
      },
      data: createOrEditDistrictDto,
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

    const districts = await this.prismaService.district.findMany({
      where: {
        OR: searchItems,
      },
      skip: query.skip,
      take: query.take,
      orderBy: {
        [query.orderBy]: query.sortOrder,
      },
      include: {
        state: true,
      },
    });

    const totalCount = districts.length;

    return { totalCount, districts };
  }

  async findOne(id: number) {
    await this.checkIfDistrictExists(id);
    return this.prismaService.district.findUnique({
      where: {
        id: id,
      },
      include: {
        state: true,
      },
    });
  }

  async remove(id: number) {
    await this.checkIfDistrictExists(id);
    return this.prismaService.district.delete({
      where: {
        id: id,
      },
    });
  }

  async checkIfDistrictExists(id: number) {
    const district = await this.prismaService.district.findUnique({
      where: {
        id: id,
      },
    });
    if (!district) {
      throw new NotFoundException('जिल्ला भेटिएन');
    }
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

  async checkIfDistrictAlreadyExists(
    createOrEditDistrictDto: CreateOrEditDistrictDto,
  ) {
    const district = await this.prismaService.district.findFirst({
      where: {
        OR: [
          {
            nepali_name: {
              equals: createOrEditDistrictDto.nepali_name,
            },
          },
          {
            english_name: {
              equals: createOrEditDistrictDto.english_name,
            },
          },
        ],
      },
    });

    if (!district) return;

    if (createOrEditDistrictDto.id) {
      if (district.id === createOrEditDistrictDto.id) return;
    }

    throw new ConflictException('जिल्ला पहिला नै रेजिस्टर्ड छ');
  }
}
