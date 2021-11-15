import { Document } from 'mongoose';

export interface Trainer extends Document {
  readonly trainerId: string;
  readonly email: string;
  readonly name: string;
  readonly lastName: string;
  readonly sport: string;
  readonly phoneNumber: string;
  readonly password: string;
}
