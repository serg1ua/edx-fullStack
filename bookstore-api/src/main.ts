import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Cache-Control', 'no-store');
    next();
  },
);

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
