import { ClientKafka } from '@nestjs/microservices';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/env';

@Injectable()
export class KafkaService extends ClientKafka implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    // same as new ClientKafka()
    super({
      client: {
        clientId: 'purchases',
        brokers: [configService.get('KAFKA_BROKERS')],
      },
    });
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.close();
  }
}
