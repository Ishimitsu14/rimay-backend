import { PrismaAdapter } from '../prisma';
import { type Prisma } from '../prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository {
  _include = {
    flow: true,
  };

  constructor(private readonly prisma: PrismaAdapter) {}

  async create(taskFields: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
      data: taskFields,
      include: this._include,
    });
  }

  // setInputs Set inputs if not set
  async setInputs(id: string, inputs: string[]) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        inputs,
      },
      include: this._include,
    });
  }

  async setResult(id: string, result: string) {
    return this.prisma.task.update({
      where: {
        id, // TODO: and where result == null
      },
      data: {
        result,
      },
      include: this._include, // NOTE: do we need it?
    });
  }

  async findById(id: string) {
    return this.prisma.task.findFirst({
      where: {
        id,
      },
      include: this._include,
    });
  }

  async findByFlow(id: string) {
    return this.prisma.task.findMany({
      where: {
        id,
      },
      include: this._include,
    });
  }
}
