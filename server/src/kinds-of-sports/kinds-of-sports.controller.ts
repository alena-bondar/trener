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
import { KindsOfSportsService } from './kinds-of-sports.service';
import { CreateKindsOfSportDto } from './dto/create-kinds-of-sport.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';

@Controller('kinds-of-sports')
export class KindsOfSportsController {
  constructor(private readonly kindsOfSportsService: KindsOfSportsService) {}

  //add data of one sport to the database

  @Post('/kind-of-sport')
  async addKindOfSport(
    @Res() res,
    @Body() createKindsOfSportDto: CreateKindsOfSportDto,
  ) {
    const newSport = await this.kindsOfSportsService.addKindOfSport(
      createKindsOfSportDto,
    );
    return res.status(HttpStatus.OK).json({
      sport: newSport,
    });
  }

  //add data from multiple sports to the database

  @Post('/all-kinds-of-sports')
  async addKindsOfSports(
    @Res() res,
    @Body() createKindsOfSportDto: CreateKindsOfSportDto,
  ) {
    const result = await this.kindsOfSportsService.addKindsOfSports(
      createKindsOfSportDto,
    );
    return res.status(HttpStatus.OK).json({
      sport: 0,
    });
  }

  //get sport by id

  @Get('sport/:sportID')
  async getKindOfSportByID(
    @Res() res,
    @Param('sportID', new ValidateObjectId()) sportID,
  ) {
    const sport = await this.kindsOfSportsService.getKindOfSportByID(sportID);
    if (!sport) throw new NotFoundException('Trainer does not exist');
    return res.status(HttpStatus.OK).json(sport);
  }

  //get all sports

  @Get('all-kinds-of-sports')
  async getKindsOfSports(@Res() res) {
    const allKindsOfSports = await this.kindsOfSportsService.getKindsOfSports();
    return res.status(HttpStatus.OK).json(allKindsOfSports);
  }
}
