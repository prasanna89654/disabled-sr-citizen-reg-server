import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrEditLocalDto } from './dto/create-local.dto';
import { Local } from '@prisma/client';
import { CommonQuery } from 'src/interface/query.interface';
import { ConflictException, NotFoundException } from 'src/exception/http-exceptions';

@Injectable()
export class LocalService {
  constructor(private readonly prismaService: PrismaService) {}

  async upsert(createOrEditLocalDto: CreateOrEditLocalDto): Promise<Local> {
    await this.checkIfDistrictExists(createOrEditLocalDto.district_id);
    await this.checkIfLocalAlreadyExists(createOrEditLocalDto);
    if (!createOrEditLocalDto.id) {
      return this.prismaService.local.create({
        data: createOrEditLocalDto,
      });
    }

    await this.checkIfLocalExists(createOrEditLocalDto.id);
    return this.prismaService.local.update({
      where: {
        id: createOrEditLocalDto.id,
      },
      data: createOrEditLocalDto,
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

    const locals = await this.prismaService.local.findMany({
      where: {
        OR: searchItems,
      },
      skip: query.skip,
      take: query.take,
      orderBy: {
        [query.orderBy]: query.sortOrder,
      },
      include: {
        district: true,
      },
    });

    const totalCount = locals.length;

    return { totalCount, locals };
  }

  async findOne(id: number) {
    await this.checkIfLocalExists(id);
    return this.prismaService.local.findUnique({
      where: {
        id: id,
      },
      include: {
        district: true,
      },
    });
  }

  async remove(id: number) {
    await this.checkIfLocalExists(id);
    return this.prismaService.local.delete({
      where: {
        id: id,
      },
    });
  }

  async checkIfLocalExists(id: number) {
    const local = await this.prismaService.local.findUnique({
      where: {
        id: id,
      },
    });
    if (!local) {
      throw new NotFoundException('स्थानीय तह भेटिएन');
    }
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

  async checkIfLocalAlreadyExists(createOrEditLocalDto: CreateOrEditLocalDto) {
    const local = await this.prismaService.local.findFirst({
      where: {
        OR: [
          {
            nepali_name: {
              equals: createOrEditLocalDto.nepali_name,
            },
          },
          {
            english_name: {
              equals: createOrEditLocalDto.english_name,
            },
          },
        ],
      },
    });
    if(!local) return;

    if (createOrEditLocalDto.id) {
      if (local.id === createOrEditLocalDto.id) return;
    }

    throw new ConflictException('स्थानीय तह पहिला नै रेजिस्टर्ड छ');
   
  }
}
