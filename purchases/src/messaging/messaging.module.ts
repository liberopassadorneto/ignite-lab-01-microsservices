import { Module } from '@nestjs/common';
import { KafkaService } from '@/messaging/kafka.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@/env/env-validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class MessagingModule {}
