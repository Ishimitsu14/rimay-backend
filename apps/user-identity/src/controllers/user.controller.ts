import { Controller } from '@nestjs/common';
import { UserService } from '../services';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUserByIdRequest } from '@shared/grpc/user-identity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetUserById')
  async getUserById(payload: GetUserByIdRequest) {
    return this.userService.getUserById(payload);
  }
}
