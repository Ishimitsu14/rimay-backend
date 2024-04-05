import { Logger } from '@nestjs/common';
import { Serializer } from '@nestjs/microservices';
import { NewTask } from '@shared/grpc/chatgpt-adapter';
import { ProtoMapping } from '../types/proto-message.map';

export class ProtoSerializer implements Serializer {
  private readonly logger = new Logger(ProtoSerializer.name);

  constructor(private readonly msgMap: ProtoMapping) {}

  serialize(value: { pattern: string; data: any }) {
    try {
      return {
        ...value,
        data: this.msgMap[value.pattern].encode(value.data).finish(),
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
