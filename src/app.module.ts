import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: 'mysql://root:database2002@localhost:3306/party-safe',
      migrationsRun: true,
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: [
        process.env.ENVIRONMENT == 'prod'
          ? '**/infrastructure/persistence/entities/*{.ts,.js}'
          : 'dist/**/infrastructure/persistence/entities/*{.ts,.js}',
      ],
      subscribers: [],
      migrations: [
        process.env.ENVIRONMENT == 'prod'
          ? 'shared/infrastructure/persistence/migrations/*{.ts,.js}'
          : 'dist/shared/infrastructure/persistence/migrations/*{.ts,.js}',
      ],
      migrationsTableName: 'migrations',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
