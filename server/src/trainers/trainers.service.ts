import { Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer } from './interfaces/trainer.interface';
import { Model } from 'mongoose';

@Injectable()
export class TrainersService {
  constructor(
    @InjectModel('Trainer') private readonly trainerModel: Model<Trainer>,
  ) {}

  async addTrainer(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const newTrainer = await new this.trainerModel(createTrainerDto);
    return newTrainer.save();
  }

  async getTrainers(): Promise<Trainer[]> {
    const trainers = await this.trainerModel.find().exec();
    return trainers;
  }
}
