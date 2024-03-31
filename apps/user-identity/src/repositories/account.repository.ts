import { PrismaAdapter, ProviderEnum } from '../prisma';
import { type Prisma } from '../prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository {
  _include = {
    user: true,
  };

  constructor(private readonly prisma: PrismaAdapter) {}

  async createAccount(accountFields: Prisma.AccountUncheckedCreateInput) {
    return this.prisma.account.create({
      data: accountFields,
      include: this._include,
    });
  }

  async findUserByProviderAndId(userId: number, provider: ProviderEnum) {
    return this.prisma.account.findFirst({
      where: {
        userId,
        provider,
      },
    });
  }
}
