import { PrismaAdapter } from '../prisma/adapters';
import { type Prisma } from '../prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlowRepository {
  _include = {
    tasks: true,
  };

  constructor(private readonly prisma: PrismaAdapter) {}

  async create(flowFields: Prisma.FlowCreateInput) {
    return this.prisma.flow.create({
      data: flowFields,
      include: this._include,
    });
  }

  async findById(id: string) {
    return this.prisma.flow.findFirst({
      where: {
        id,
      },
      include: this._include,
    });
  }

  async findByUser(userId: number) {
    return this.prisma.flow.findFirst({
      where: {
        userId: userId,
      },
      include: this._include,
    });
  }
}
