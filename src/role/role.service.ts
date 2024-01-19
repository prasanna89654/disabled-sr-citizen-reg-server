import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrEditRoleDto } from './dto/create-update-role.dto';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommonQuery } from 'src/interface/query.interface';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}
  async upsert(createOrEditRoleDto: CreateOrEditRoleDto): Promise<Role> {
    if (!createOrEditRoleDto.id) {
      await this.checkIfRoleAlreadyExists(createOrEditRoleDto);
      return this.prismaService.role.create({
        data: createOrEditRoleDto,
      });
    }

    await this.checkIfRoleExists(createOrEditRoleDto.id);
    await this.checkIfRoleAlreadyExists(createOrEditRoleDto);
    return this.prismaService.role.update({
      where: {
        id: createOrEditRoleDto.id,
      },
      data: createOrEditRoleDto,
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

    const roles = await this.prismaService.role.findMany({
      where: {
        OR: searchItems,
      },
      skip: query.skip,
      take: query.take,
      orderBy: {
        [query.orderBy]: query.sortOrder,
      },
    });

    const totalCount = roles.length;

    return { totalCount, roles };
  }

  async findOne(id: number) {
    await this.checkIfRoleExists(id);
    return this.prismaService.role.findUnique({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    await this.checkIfRoleExists(id);
    return this.prismaService.role.delete({
      where: {
        id: id,
      },
    });
  }

  async checkIfRoleExists(id: number) {
    const role = await this.prismaService.role.findUnique({
      where: {
        id: id,
      },
    });
    if (!role) {
      throw new NotFoundException('रोल भेटिएन');
    }
  }

  async checkIfRoleAlreadyExists(createOrEditRoleDto: CreateOrEditRoleDto) {
    const role = await this.prismaService.role.findFirst({
      where: {
        OR: [
          {
            nepali_name: {
              equals: createOrEditRoleDto.nepali_name,
            },
          },
          {
            english_name: {
              equals: createOrEditRoleDto.english_name,
            },
          },
        ],
      },
    });
    if (!role) return;

    if (createOrEditRoleDto.id) {
      if (role.id === createOrEditRoleDto.id) return;
    }

    throw new ConflictException('रोल पहिला नै रेजिस्टर्ड छ');
  }
}
