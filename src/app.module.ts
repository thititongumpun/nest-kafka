import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DOWRY_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'dowry',
            brokers: ['168.138.187.218:9092'],
          },
          consumer: {
            groupId: 'test-group',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
