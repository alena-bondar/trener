import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './kinds-of-sports/schemas/post.schema';
import { seeder } from 'nestjs-seeder';
import { SportSeeder } from './kinds-of-sports/seeder/sport.seeder';
import { ConfigModule } from '@nestjs/config';

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forFeature([{ name: 'KindOfSport', schema: PostSchema }]),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
      }),
    }),
  ],
}).run([SportSeeder]);
