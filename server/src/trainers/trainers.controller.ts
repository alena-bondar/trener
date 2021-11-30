import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  NotFoundException,
  Param,
  BadRequestException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('trainers')
export class TrainersController {
  constructor(
    private readonly trainersService: TrainersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Res() res, @Body() createTrainerDto: CreateTrainerDto) {
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

  @Post('login')
  async login(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() createAuthDto: CreateAuthDto,
  ) {
    const trainer = await this.trainersService.getTrainerByEmail(
      createAuthDto.email,
    );
    if (!trainer) {
      throw new BadRequestException('Invalid email');
    }
    if (!(await bcrypt.compare(createAuthDto.password, trainer.password))) {
      throw new BadRequestException('Invalid password');
    }
    const jwt = await this.jwtService.signAsync({ id: trainer._id });
    res.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'successful login',
    };
  }

  @Get('trainer')
  async trainer(@Req() req) {
    try {
      const cookie = req.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }
      const trainerId = await this.trainersService.findOne(data['id']);

      return trainerId;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res) {
    res.clearCookie('jwt');

    return {
      message: 'successful logout',
    };
  }

  @Get(':ID')
  async findOne(@Res() res, @Param('ID', new ValidateObjectId()) trainerID) {
    const trainer = await this.trainersService.findOne(trainerID);
    if (!trainer) throw new NotFoundException('Trainer does not exist');
    return res.status(HttpStatus.OK).json(trainer);
  }

  @Get()
  async findAll(@Res() res) {
    const allTrainers = await this.trainersService.findAll();
    return res.status(HttpStatus.OK).json(allTrainers);
  }
}
