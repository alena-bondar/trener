import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrainerDocument = Trainer & Document;

@Schema()
export class Trainer {
  @Prop()
  trainerID: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  sport: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  password: string;
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
