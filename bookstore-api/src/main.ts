import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';

const app = express();
app.use(helmet());

async function bootstrap() {
  const server = await NestFactory.create(AppModule, new ExpressAdapter(app));
  server.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  const config = server.get(ConfigService);
  const PORT = config.get<number>('PORT') as number;

  await server.listen(PORT, () =>
    console.log(`Server is listening on http://localhost:${PORT}`),
  );
}

void bootstrap();
