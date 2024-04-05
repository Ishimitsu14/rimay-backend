import { Deserializer } from '@nestjs/microservices';

export class IdleDeserializer implements Deserializer {
  deserialize(value: { pattern: string; data: Uint8Array }) {
    return value;
  }
}
