import { Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer } from './interfaces/trainer.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TrainersService {
  constructor(
    @InjectModel('Trainer') private readonly trainerModel: Model<Trainer>,
  ) {}

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const hash = await bcrypt.hash(createTrainerDto.password, 10);
    createTrainerDto.password = hash;
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
}
