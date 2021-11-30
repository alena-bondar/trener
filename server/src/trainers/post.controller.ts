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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('trainers')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Res() res, @Body() createPostDto: CreatePostDto) {
    const trainerEmail = await this.postService.getTrainerByEmail(
      createPostDto.email,
    );
    if (trainerEmail && trainerEmail.email === createPostDto.email) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed! Email is already in use!',
      });
    }

    const trainerPhoneNumber = await this.postService.getTrainerByPhoneNumber(
      createPostDto.phoneNumber,
    );
    if (
      trainerPhoneNumber &&
      trainerPhoneNumber.phoneNumber === createPostDto.phoneNumber
    ) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed! Phone number is already in use!',
      });
    }

    const newTrainer = await this.postService.create(createPostDto);

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
    const trainer = await this.postService.getTrainerByEmail(
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
      const trainerId = await this.postService.findOne(data['id']);

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
    const trainer = await this.postService.findOne(trainerID);
    if (!trainer) throw new NotFoundException('Trainer does not exist');
    return res.status(HttpStatus.OK).json(trainer);
  }

  @Get()
  async findAll(@Res() res) {
    const allTrainers = await this.postService.findAll();
    return res.status(HttpStatus.OK).json(allTrainers);
  }
}
