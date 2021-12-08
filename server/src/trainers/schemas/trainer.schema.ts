import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Trainer {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  readonly age: number;

  @Prop()
  readonly price: number;

  @Prop({ required: true })
  sport: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;
}
export const TrainerSchema = SchemaFactory.createForClass(Trainer);
