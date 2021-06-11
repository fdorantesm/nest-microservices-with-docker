import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import {
  ConfigFactory,
  ConfigModuleOptions,
} from '@nestjs/config/dist/interfaces';

@Module({})
export class ConfigModule {
  static forFeature(config: ConfigFactory): DynamicModule {
    return {
      imports: [NestConfigModule.forFeature(config)],
      module: ConfigModule,
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
  static forRoot(options: ConfigModuleOptions): DynamicModule {
    return {
      imports: [NestConfigModule.forRoot(options)],
      module: ConfigModule,
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
