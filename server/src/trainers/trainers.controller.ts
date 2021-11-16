import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';

@Controller('trainers')
export class TrainersController {
  //private createTrainerDto: CreateTrainerDto;
  constructor(private readonly trainersService: TrainersService) {}

  @Post('/trainer')
  async addTrainer(@Res() res, @Body() createTrainerDto: CreateTrainerDto) {
    const trainerEmail = await this.trainersService.getTrainerByEmail(
      createTrainerDto.email,
    );
    if (trainerEmail && trainerEmail.email === createTrainerDto.email) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed! Email is already in use!',
      });
    }

    const trainerPhoneNumber =
      await this.trainersService.getTrainerByPhoneNumber(
        createTrainerDto.phoneNumber,
      );
    if (
      trainerPhoneNumber &&
      trainerPhoneNumber.phoneNumber === createTrainerDto.phoneNumber
    ) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed! Phone number is already in use!',
      });
    }

    const newTrainer = await this.trainersService.addTrainer(createTrainerDto);
    return res.status(HttpStatus.OK).json({
      trainer: newTrainer,
    });
  }

  @Get('trainer/:trainerID')
  async getPost(
    @Res() res,
    @Param('trainerID', new ValidateObjectId()) trainerID,
  ) {
    const trainer = await this.trainersService.getTrainer(trainerID);
    if (!trainer) throw new NotFoundException('Trainer does not exist');
    return res.status(HttpStatus.OK).json(trainer);
  }

  @Get('all-trainers')
  async getTrainers(@Res() res) {
    const allTrainers = await this.trainersService.getTrainers();
    return res.status(HttpStatus.OK).json(allTrainers);
  }
}
