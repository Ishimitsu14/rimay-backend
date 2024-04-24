import { Injectable } from '@nestjs/common';
import { FlowRunnerConfig } from '../../config';
import { PrismaClient } from '../client';

@Injectable()
export class PrismaAdapter extends PrismaClient {
  constructor() {
    super({
      datasourceUrl: FlowRunnerConfig.get('DATABASE_URL'),
    });
  }
}
