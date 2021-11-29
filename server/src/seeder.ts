import { MongooseModule } from '@nestjs/mongoose';
import { SportSchema } from './kinds-of-sports/schemas/sport.schema';
import { seeder } from 'nestjs-seeder';
import { SportSeeder } from './kinds-of-sports/seeder/sport.seeder';
import { ConfigModule } from '@nestjs/config';

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forFeature([{ name: 'KindOfSport', schema: SportSchema }]),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
      }),
    }),
  ],
}).run([SportSeeder]);
