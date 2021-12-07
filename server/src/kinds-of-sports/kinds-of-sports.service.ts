import { Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KindOfSport } from './interfaces/sport.interface';

@Injectable()
export class KindsOfSportsService {
  constructor(
    @InjectModel('KindOfSport') private readonly sportModel: Model<KindOfSport>,
  ) {}

  async create(createSportDto: CreateSportDto): Promise<KindOfSport> {
    const newSport = await new this.sportModel(createSportDto);
    return newSport.save();
  }

  async findOne(_id): Promise<KindOfSport> {
    const sport = await this.sportModel.findById(_id).exec();
    return sport;
  }

  async findFilteredSport(searchParam): Promise<KindOfSport[]> {
    const sportList = await this.sportModel.find().exec();
    const filteredSport = sportList.filter((sport) =>
      sport.label.toLowerCase().includes(searchParam.toLowerCase()),
    );

    return filteredSport;
  }

  async findAll(): Promise<KindOfSport[]> {
    const sportList = await this.sportModel.find().exec();
    return sportList;
  }
}
