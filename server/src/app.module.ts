import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainersModule } from './trainers/trainers.module';
import { ConfigModule } from '@nestjs/config';
import { SportModule } from './kinds-of-sports/sport.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
      }),
    }),
    SportModule,
    TrainersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
