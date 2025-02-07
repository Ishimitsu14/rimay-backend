import { PrismaAdapter } from '../prisma/adapters';
import { ProviderEnum, type Prisma } from '../prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  _include = {
    account: true,
    authToken: true,
  };
  constructor(private readonly prisma: PrismaAdapter) {}

  async create(userFields: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: userFields,
      include: this._include,
    });
  }

  async findById(id: number) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
      include: this._include,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
      include: this._include,
    });
  }
}
