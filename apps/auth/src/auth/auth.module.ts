import { Module } from '@nestjs/common';
import * as path from 'path';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname.replace(/\/dist/, ''), '.env'),
      isGlobal: true,
      load: [
        () => ({
          server: {
            host: process.env.HOST,
            port: process.env.PORT,
          },
        }),
      ],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
