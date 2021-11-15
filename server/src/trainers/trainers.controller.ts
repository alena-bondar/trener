import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Controller('trainers')
export class TrainersController {
  //private createTrainerDto: CreateTrainerDto;
  constructor(private readonly trainersService: TrainersService) {}

  @Post('/trainer')
  async addTrainer(@Res() res, @Body() createTrainerDto: CreateTrainerDto) {
    const newTrainer = await this.trainersService.addTrainer(createTrainerDto);
    return res.status(HttpStatus.OK).json({
      message: 'Trainer was added successfully',
      trainer: newTrainer,
    });
  }

  @Get('all-trainers')
  async getTrainers(@Res() res) {
    const allTrainers = await this.trainersService.getTrainers();
    return res.status(HttpStatus.OK).json(allTrainers);
  }
}
