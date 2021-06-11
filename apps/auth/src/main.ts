import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import {
  MicroserviceOptions,
  TcpClientOptions,
  Transport,
} from '@nestjs/microservices';

import { AuthModule } from './auth/auth.module';
import { ServerConfigType } from '../../core/src/interfaces/server-config-type.interface';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService: ConfigService = app.get('ConfigService');
  const config = configService.get<ServerConfigType>('server');
  const { host, port } = config;
  const options: TcpClientOptions = {
    transport: Transport.TCP,
    options: { host, port },
  };

  app.connectMicroservice<MicroserviceOptions>(options);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const err = errors.map((el) => {
          return el.constraints;
        });
        throw new BadRequestException(err);
      },
    }),
  );

  app.startAllMicroservices(() => {
    const mod = __dirname.split('/').pop();
    Logger.log(
      `Listening on port ${config.port}`,
      `${mod.charAt(0).toUpperCase().concat(mod.slice(1))}`,
    );
  });
}

bootstrap();
