import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { Trainer } from './schemas/trainer.schema';

@Controller('trainers')
export class TrainersController {
  //private createTrainerDto: CreateTrainerDto;
  constructor(private readonly trainersService: TrainersService) {}

  @Post('/trainer')
  async create(@Res() res, @Body() createTrainerDto: CreateTrainerDto) {
    const newTrainer = await this.trainersService.create(createTrainerDto);
    return res.status(HttpStatus.OK).json({
      message: 'Trainer was added successfully',
      post: newTrainer,
    });
  }

  @Get()
  async findAll(): Promise<Trainer[]> {
    return this.trainersService.findAll();
  }
}
