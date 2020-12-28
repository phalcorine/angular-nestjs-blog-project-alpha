import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('config/db')
  getDBConfigs() {
    const config = {
      dbname: this.configService.get('DB_NAME'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASS')
    };

    return config;
  }
}
