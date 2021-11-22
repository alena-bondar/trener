import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KindOfSport } from './interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('KindOfSport') private readonly sportModel: Model<KindOfSport>,
  ) {}

  async create(
      createPostDto: CreatePostDto,
  ): Promise<KindOfSport> {
    const newSport = await new this.sportModel(createPostDto);
    return newSport.save();
  }

  async findOne(_id): Promise<KindOfSport> {
    const sport = await this.sportModel.findById(_id).exec();
    return sport;
  }

  async findAll(): Promise<KindOfSport[]> {
    const sportList = await this.sportModel.find().exec();
    return sportList;
  }
}
