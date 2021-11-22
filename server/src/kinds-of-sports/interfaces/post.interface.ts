import { Document } from 'mongoose';

export interface KindOfSport extends Document {
  readonly value: string;
  readonly label: string;
}
