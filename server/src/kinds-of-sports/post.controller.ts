import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';

@Controller('kinds-of-sports')
export class PostController {
  constructor(private readonly kindsOfSportsService: PostService) {}

  //add data of one sport to the database

  @Post()
  async create(@Res() res, @Body() createPostDto: CreatePostDto) {
    const newSport = await this.kindsOfSportsService.create(createPostDto);
    return res.status(HttpStatus.OK).json({
      sport: newSport,
    });
  }

  //get sport by id

  @Get(':ID')
  async findOne(@Res() res, @Param('ID', new ValidateObjectId()) sportID) {
    const sport = await this.kindsOfSportsService.findOne(sportID);
    if (!sport) throw new NotFoundException('Trainer does not exist');
    return res.status(HttpStatus.OK).json(sport);
  }

  //get all sports

  @Get()
  async findAll(@Res() res) {
    const allKindsOfSports = await this.kindsOfSportsService.findAll();
    return res.status(HttpStatus.OK).json(allKindsOfSports);
  }
}
