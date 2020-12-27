import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const serverPort = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(serverPort);
}
bootstrap();
