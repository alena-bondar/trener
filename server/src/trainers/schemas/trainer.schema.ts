import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrainerDocument = Trainer & Document;

@Schema()
export class Trainer {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  sport: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
