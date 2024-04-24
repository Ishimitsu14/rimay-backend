import { Logger } from '@nestjs/common';
import { Deserializer } from '@nestjs/microservices';
import { ProtoMapping } from '../types/proto-message.map';

export class ProtoDeserializer implements Deserializer {
  private readonly logger = new Logger(ProtoDeserializer.name);

  constructor(private readonly msgMap: ProtoMapping) {}

  deserialize(value: { pattern: string; data: Uint8Array }) {
    try {
      return {
        ...value,
        data: this.msgMap[value.pattern].decode(value.data).finish(),
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
