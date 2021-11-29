import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KindOfSportDocument = KindOfSport & Document;

@Schema()
export class KindOfSport {
  @Prop({ required: true, unique: true })
  value: string;

  @Prop({ required: true, unique: true })
  label: string;
}

export const SportSchema = SchemaFactory.createForClass(KindOfSport);
