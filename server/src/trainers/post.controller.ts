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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';

@Controller()
export class PostController {
  constructor(private readonly trainersService: PostService) {}

  @Post('trainers')
  async create(@Res() res, @Body() createTrainerDto: CreatePostDto) {
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

    const newTrainer = await this.trainersService.create(createTrainerDto);
    return res.status(HttpStatus.OK).json({
      trainer: newTrainer,
    });
  }

  @Get('trainers/:ID')
  async findOne(
    @Res() res,
    @Param('ID', new ValidateObjectId()) trainerID,
  ) {
    const trainer = await this.trainersService.findOne(trainerID);
    if (!trainer) throw new NotFoundException('Trainer does not exist');
    return res.status(HttpStatus.OK).json(trainer);
  }

  @Get('trainers')
  async findAll(@Res() res) {
    const allTrainers = await this.trainersService.findAll();
    return res.status(HttpStatus.OK).json(allTrainers);
  }
}
