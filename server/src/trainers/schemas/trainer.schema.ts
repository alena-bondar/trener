import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Trainer {
  @Prop()
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

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: {} })
  locationSport: {
    lat: number;
    lng: number;
  };
}
export const TrainerSchema = SchemaFactory.createForClass(Trainer);
