import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login.response';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from 'src/exception/http-exceptions';
import { CommonQuery } from 'src/interface/query.interface';
import { CreateOrEditUserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { exclude } from 'src/utility/functions/prisma.function';
import { ChangePasswordInput } from './dto/change-password.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            email: loginDto.username,
          },
          {
            mobile: loginDto.username,
          },
        ],
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid username or password');
    }

    const generatedToken = this.jwtService.sign({
      userId: user.id,
      role: user.role.english_name,
    });

    const loginResponse: LoginResponse = {
      user_id: user.id,
      access_token: generatedToken,
      role: user.role.english_name,
    };

    return loginResponse;
  }

  async upsert(createOrEditUserDto: CreateOrEditUserDto) {
    await this.checkIfRoleExists(createOrEditUserDto.role_id);
    await this.checkIfUserAlreadyExists(createOrEditUserDto);

    if (!createOrEditUserDto.id) {
      await this.checkIfPasswordAlreadyExists(createOrEditUserDto.password);
      const hashedPassword = await bcrypt.hash(
        createOrEditUserDto.password,
        10,
      );
      const users = await this.prismaService.user.create({
        data: {
          ...createOrEditUserDto,
          password: hashedPassword,
        },
      });
      return exclude(users, ['password']);
    }

    await this.checkIfUserExists(createOrEditUserDto.id);
    const user = await this.prismaService.user.update({
      where: {
        id: createOrEditUserDto.id,
      },
      data: {
        ...createOrEditUserDto,
        password: undefined,
      },
      include: {
        role: true,
      },
    });
    return exclude(user, ['password']);
  }

  async findAll(query: CommonQuery) {
    const searchItems = [
      {
        name: {
          contains: query.search,
        },
      },
      {
        email: {
          contains: query.search,
        },
      },
      {
        mobile: {
          contains: query.search,
        },
      },
    ];

    const allUsers: User[] = await this.prismaService.user.findMany({
      where: {
        OR: searchItems,
      },
      skip: query.skip,
      take: query.take,
      orderBy: {
        [query.orderBy]: query.sortOrder,
      },
      include: {
        role: true,
      },
    });

    const users = allUsers.map((user) => {
      return exclude(user, ['password']);
    });

    const totalCount = users.length;

    return { totalCount, users };
  }

  async findOne(id: number) {
    await this.checkIfUserExists(id);
    const users = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: {
        role: true,
      },
    });
    return exclude(users, ['password']);
  }

  async remove(id: number) {
    await this.checkIfUserExists(id);
    const user = await this.prismaService.user.delete({
      where: {
        id: id,
      },
      include: {
        role: true,
      },
    });
    return exclude(user, ['password']);
  }

  async changePassword(changePasswordInput: ChangePasswordInput) {
    await this.checkIfUserExists(changePasswordInput.user_id);
    await this.checkIfOldPasswordIsValid(changePasswordInput);
    await this.checkIfPasswordAlreadyExists(changePasswordInput.new_password);
    const hashedPassword = await bcrypt.hash(
      changePasswordInput.new_password,
      10,
    );
    const user = await this.prismaService.user.update({
      where: {
        id: changePasswordInput.user_id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return exclude(user, ['password']);
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

  async checkIfUserExists(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('प्रयोगकर्ता भेटिएन');
    }
  }

  async checkIfUserAlreadyExists(createOrEditUserDto: CreateOrEditUserDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: createOrEditUserDto.email,
            },
          },
          {
            mobile: {
              equals: createOrEditUserDto.mobile,
            },
          },
        ],
      },
    });
    if (!user) return;

    if (createOrEditUserDto.id) {
      if (user.id === createOrEditUserDto.id) return;
    }

    throw new ConflictException('प्रयोगकर्ता पहिला नै रेजिस्टर्ड छ');
  }

  async checkIfPasswordAlreadyExists(password: string) {
    const users = await this.prismaService.user.findMany();
    const user = users.find((user) =>
      bcrypt.compareSync(password, user.password),
    );
    if (user) {
      throw new ConflictException('प्रयोगकर्ता पहिला नै रेजिस्टर्ड छ');
    }
  }

  async checkIfOldPasswordIsValid(changePasswordInput: ChangePasswordInput) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: changePasswordInput.user_id,
      },
    });

    const isPasswordValid = await bcrypt.compare(
      changePasswordInput.old_password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('पुरानो पासवर्ड गलत छ');
    }
  }
}
