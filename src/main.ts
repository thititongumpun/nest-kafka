import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['168.138.187.218:9092'],
          clientId: 'dowry',
        },
        consumer: {
          groupId: 'test-group',
        },
        producer: {
          createPartitioner: Partitioners.DefaultPartitioner,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
