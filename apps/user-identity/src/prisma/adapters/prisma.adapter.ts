import { Injectable } from '@nestjs/common';
import { UserIdentityConfig } from '../../config';
import { PrismaClient } from '../client';

@Injectable()
export class PrismaAdapter extends PrismaClient {
  constructor() {
    super({
      datasourceUrl: UserIdentityConfig.get('DATABASE_URL'),
    });
  }
}
