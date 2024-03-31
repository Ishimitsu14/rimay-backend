import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { GetUserByIdRequest } from '@shared/grpc/user-identity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(payload: GetUserByIdRequest) {
    return this.userRepository.findById(payload.id);
  }
}
