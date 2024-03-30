import { PrismaAdapter } from '../prisma/adapters';
import { Prisma } from '../prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthTokenRepository {
  _include = {
    user: true,
  };
  constructor(private readonly prisma: PrismaAdapter) {}

  async create(authTokenInput: Prisma.AuthTokenUncheckedCreateInput) {
    return this.prisma.authToken.create({
      data: {
        userId: authTokenInput.userId,
        accessToken: authTokenInput.accessToken,
        refreshToken: authTokenInput.refreshToken,
        expiresAt: authTokenInput.expiresAt,
      },
      include: this._include,
    });
  }

  async findByRefreshToken(refreshToken: string) {
    return this.prisma.authToken.findFirst({
      where: {
        refreshToken,
      },
    });
  }

  async deleteById(id: number) {
    return this.prisma.authToken.delete({
      where: {
        id,
      },
    });
  }

  async batchDelete(authTokenWhereCondition: Prisma.AuthTokenWhereInput) {
    await this.prisma.authToken.deleteMany({
      where: authTokenWhereCondition,
    });
  }
}
