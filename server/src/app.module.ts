import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainersModule } from './trainers/trainers.module';
import { ConfigModule } from '@nestjs/config';
import { KindsOfSportsModule } from './kinds-of-sports/kinds-of-sports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
      }),
    }),
    TrainersModule,
    KindsOfSportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
