import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

import { AppController } from './controllers/app.controller';
import { AuthConfigType } from '../../../core/src/interfaces/auth-config-type.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname.replace(/\/dist/, ''), '.env'),
      isGlobal: true,
      load: [
        () => ({
          server: {
            port: process.env.PORT,
          },
          auth: {
            host: process.env.AUTH_SERVICE_HOST,
            port: process.env.AUTH_SERVICE_PORT,
          },
        }),
      ],
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const config = configService.get<AuthConfigType>('auth');
          return {
            transport: Transport.TCP,
            options: {
              host: config.host,
              port: config.port,
            },
          };
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
