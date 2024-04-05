import { Logger } from '@nestjs/common';
import { Serializer } from '@nestjs/microservices';
import { NewTask } from '@shared/grpc/chatgpt-adapter';

const PROTO_MSG_MAP = {
  'v1.chatgpt.task.new': NewTask,
};

export class ProtoSerializer implements Serializer {
  private readonly logger = new Logger(ProtoSerializer.name);
  serialize(value: { pattern: string; data: any }) {
    try {
      return {
        ...value,
        data: PROTO_MSG_MAP[value.pattern].encode(value.data).finish(),
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
