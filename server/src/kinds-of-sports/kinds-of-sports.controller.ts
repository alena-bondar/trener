import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { KindsOfSportsService } from './kinds-of-sports.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';

@Controller('kinds-of-sports')
export class KindsOfSportsController {
  constructor(private readonly kindsOfSportsService: KindsOfSportsService) {}

  //add data of one sport to the database

  @Post()
  async create(@Res() res, @Body() createSportDto: CreateSportDto) {
    const newSport = await this.kindsOfSportsService.create(createSportDto);
    return res.status(HttpStatus.OK).json({
      sport: newSport,
    });
  }

  @Get('filter')
  @UsePipes(new ValidationPipe())
  async filterSports(@Query('search') searchParam: string, @Res() res) {
    const filteredSport = await this.kindsOfSportsService.findFilteredSport(
      searchParam,
    );

    return res.status(HttpStatus.OK).json(filteredSport);
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
