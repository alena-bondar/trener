import { Document } from 'mongoose';

export interface Trainer extends Document {
  readonly trainerId: string;
  readonly email: string;
  readonly name: string;
  readonly lastName: string;
  readonly age: number;
  readonly price: number;
  readonly sport: string;
  readonly phoneNumber: string;
  readonly locationSport: object;
}
