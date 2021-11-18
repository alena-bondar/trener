import { Injectable } from '@nestjs/common';
import { CreateKindsOfSportDto } from './dto/create-kinds-of-sport.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KindOfSport } from './interfaces/sport.interface';

@Injectable()
export class KindsOfSportsService {
  constructor(
    @InjectModel('KindOfSport') private readonly sportModel: Model<KindOfSport>,
  ) {}

  async addKindOfSport(
    createKindsOfSportDto: CreateKindsOfSportDto,
  ): Promise<KindOfSport> {
    const newSport = await new this.sportModel(createKindsOfSportDto);
    return newSport.save();
  }

  async addKindsOfSports(
    createKindsOfSportDto: CreateKindsOfSportDto,
  ): Promise<KindOfSport[]> {
    return await this.sportModel.insertMany(createKindsOfSportDto);
  }

  async getKindOfSportByID(_id): Promise<KindOfSport> {
    const sport = await this.sportModel.findById(_id).exec();
    return sport;
  }

  async getKindsOfSports(): Promise<KindOfSport[]> {
    const sportList = await this.sportModel.find().exec();
    return sportList;
  }
}
