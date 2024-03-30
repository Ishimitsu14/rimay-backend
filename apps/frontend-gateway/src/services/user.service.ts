import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UserIdentityConfig } from '../../../user-identity/src/config';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceClientImpl } from '@shared/generated/proto/user-identity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  private gRpcUserService: UserServiceClientImpl;

  constructor(
    @Inject(UserIdentityConfig.get('NAMESPACE')) private client: ClientGrpc,
  ) {}

  onModuleInit(): any {
    this.gRpcUserService =
      this.client.getService<UserServiceClientImpl>('UserService');
  }

  async findUserById(id: number) {
    return firstValueFrom(
      this.gRpcUserService.GetUserById({
        id,
      }),
    );
  }
}
