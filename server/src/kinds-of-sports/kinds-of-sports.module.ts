import { Module } from '@nestjs/common';
import { KindsOfSportsService } from './kinds-of-sports.service';
import { KindsOfSportsController } from './kinds-of-sports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SportSchema } from './schemas/sport.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'KindOfSport', schema: SportSchema }]),
  ],
  controllers: [KindsOfSportsController],
  providers: [KindsOfSportsService],
})
export class KindsOfSportsModule {}
