import {
  BadRequestException,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { TrainersService } from '../trainers.service';
import { JwtService } from '@nestjs/jwt';

@Controller('trainers')
export class OauthController {
  constructor(
    private readonly trainersService: TrainersService,
    private jwtService: JwtService,
  ) {}

  @Post('google-login')
  async loginGoogle(
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: req.body.tokenId,
    });
    const payload = ticket.getPayload();

    const trainer = await this.trainersService.getTrainerByEmail(payload.email);
    if (!trainer) {
      throw new BadRequestException('Trainer not found');
    }

    const jwt = await this.jwtService.signAsync({ id: trainer._id });
    res.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'successful login',
    };
  }
}
