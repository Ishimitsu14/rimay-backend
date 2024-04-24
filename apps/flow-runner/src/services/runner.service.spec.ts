import { Test, TestingModule } from '@nestjs/testing';
import { RunnerService } from './runner.service';
import {
  ClientsModule,
  Deserializer,
  Serializer,
  Transport,
  OutgoingResponse,
} from '@nestjs/microservices';
import { v4 } from 'uuid';
import { connect } from 'nats';
import { NewTask } from '@shared/grpc/chatgpt-adapter';
import { ProtoSerializer } from '../serialization/serializer.class';
import {
  IdleDeserializer,
  ProtoDeserializer,
} from '../serialization/deserializer.class';
import { PROTO_MSG_MAP } from '../types/proto-message.map';

class DeserializerImpl implements Deserializer {
  deserialize(value: any, options?: Record<string, any>) {
    console.log('deserialize', value);
    return value;
  }
}

describe('RunnerService', () => {
  let service: RunnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'NATS', // TODO: use constant
            transport: Transport.NATS,
            options: {
              servers: ['nats://localhost:4222'],
              name: 'flowrunner0',
              pass: '12345',
              user: 'user',
              serializer: new ProtoSerializer(PROTO_MSG_MAP),
              deserializer: new ProtoDeserializer(PROTO_MSG_MAP),
            },
          },
        ]),
      ],
      providers: [RunnerService],
    }).compile();

    service = module.get<RunnerService>(RunnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('send task', async () => {
    const consumer = await connect({
      servers: ['nats://localhost:4222'],
      name: 'chatgpt-test',
      pass: '12345',
      user: 'user',
    });

    const sub = consumer.subscribe('v1.chatgpt.task.new', {
      callback: (err, msg) => {
        if (err) {
          console.error(err);
        }
        console.log('received', msg.data);
        const decoded = NewTask.decode(msg.data);
        console.log(decoded);
      },
    });

    const uuid = v4();
    console.log(uuid);
    service.sendTask({
      id: uuid.toString(),
    });

    await new Promise((r) => setTimeout(r, 15_000));

    await consumer.close();
  }, 20_000);
});
