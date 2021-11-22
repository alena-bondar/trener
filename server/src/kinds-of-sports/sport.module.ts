import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'KindOfSport', schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class SportModule {}
