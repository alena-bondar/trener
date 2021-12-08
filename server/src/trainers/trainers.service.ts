import { Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer } from './interfaces/trainer.interface';
import { Model } from 'mongoose';
import { kinsOfSports } from '../kinds-of-sports/data/data';

@Injectable()
export class TrainersService {
  constructor(
    @InjectModel('Trainer') private readonly trainerModel: Model<Trainer>,
  ) {}

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const newTrainer = await new this.trainerModel(createTrainerDto);
    return newTrainer.save();
  }

  async findOne(_id): Promise<Trainer> {
    const trainer = await this.trainerModel.findById(_id).exec();
    return trainer;
  }

  async getTrainerByEmail(email): Promise<Trainer> {
    return await this.trainerModel.findOne({ email: email }).exec();
  }

  async getTrainerByPhoneNumber(phoneNumber): Promise<Trainer> {
    return await this.trainerModel.findOne({ phoneNumber: phoneNumber }).exec();
  }

  async findAll(): Promise<Trainer[]> {
    const trainersList = await this.trainerModel.find().exec();
    return trainersList;
  }

  async filterTreners(
    sport,
    priceFrom = 0,
    priceTo = 9999,
  ): Promise<Trainer[]> {
    const trainersList = await this.trainerModel.find().exec();

    const { value } = kinsOfSports.filter(
      (discipline) => discipline.label.toLowerCase() === sport.toLowerCase(),
    )[0];

    const filteredList = trainersList.filter(
      (trener) =>
        trener.sport.toLowerCase().includes(value.toLowerCase()) &&
        trener.price >= priceFrom &&
        trener.price <= priceTo,
    );

    return filteredList;
  }
}
