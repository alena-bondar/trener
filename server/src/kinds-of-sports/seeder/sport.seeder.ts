import { KindOfSport } from '../interfaces/sport.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { kinsOfSports } from '../data/data';
import { Seeder } from 'nestjs-seeder';

@Injectable()
export class SportSeeder implements Seeder {
  constructor(
    @InjectModel('KindOfSport') private readonly sportModel: Model<KindOfSport>,
  ) {}

  async seed(): Promise<any> {
    return await this.sportModel.insertMany(kinsOfSports);
  }

  async drop(): Promise<any> {
    return this.sportModel.deleteMany({});
  }
}
