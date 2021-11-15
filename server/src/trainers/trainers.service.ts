import { Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer, TrainerDocument } from './schemas/trainer.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrainersService {
  constructor(
    @InjectModel(Trainer.name) private trainerModel: Model<TrainerDocument>,
  ) {}

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const createdTrainer = new this.trainerModel(createTrainerDto);
    return createdTrainer.save();
  }

  async getTrainers(): Promise<Trainer[]> {
    const trainers = await this.trainerModel.find().exec();
    return trainers;
  }

  async findAll(): Promise<Trainer[]> {
    return this.trainerModel.find().exec();
  }
}
