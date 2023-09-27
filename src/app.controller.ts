import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('DOWRY_SERVICE') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    const requestPatterns = ['income'];

    requestPatterns.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('income')
  async handleIncomeCreated(payload: any) {
    console.log(JSON.stringify(payload) + ' created');
  }
}
