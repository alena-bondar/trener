import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
  NotFoundException,
  Param,
  BadRequestException,
  Req,
  UnauthorizedException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import firebase from '../firebase/firebase-config';

@Controller('trainers')
export class TrainersController {
  constructor(
    private readonly trainersService: TrainersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Res() res, @Body() createTrainerDto: CreateTrainerDto) {
    const decodedToken = await firebase
      .auth()
      .verifyIdToken(createTrainerDto.token);
    if (!decodedToken.uid) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'token is not valid',
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

    const trainerData = {
      email: decodedToken.email,
      phoneNumber: createTrainerDto.phoneNumber,
      sport: createTrainerDto.sport,
      price: createTrainerDto.price,
      age: createTrainerDto.age,
      lastName: createTrainerDto.lastName,
      name: createTrainerDto.name,
      locationSport: createTrainerDto.locationSport,
    };
    const newTrainer = await this.trainersService.create(trainerData);

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
    const decodedToken = await firebase
      .auth()
      .verifyIdToken(createAuthDto.token);
    if (!decodedToken.uid) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'token is not valid',
      });
    }

    const trainerEmail = decodedToken.email;

    const trainer = await this.trainersService.getTrainerByEmail(trainerEmail);
    if (!trainer) {
      throw new BadRequestException('Invalid email');
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

  @Get('filter')
  @UsePipes(new ValidationPipe())
  async filterTreners(
    @Query('sport')
    sport: string,
    @Query('priceFrom')
    priceFrom: number,
    @Query('priceTo')
    priceTo: number,
    @Res() res,
  ) {
    const filteredList = await this.trainersService.filterTreners(
      sport,
      priceFrom,
      priceTo,
    );

    return res.status(HttpStatus.OK).json(filteredList);
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
