import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreatePostDto {
  @IsEmail()
  email: string;

  @MinLength(2, {
    message: 'Name is too short. Minimal length is 2 characters',
  })
  @MaxLength(40, {
    message: 'Name is too long. Maximal length is 40 characters',
  })
  name: string;

  @MinLength(2, {
    message: 'LastName is too short. Minimal length is 2 characters',
  })
  @MaxLength(40, {
    message: 'Last name is too long. Maximal length is 40 characters',
  })
  lastName: string;
  sport: string;

  @IsMobilePhone()
  @MinLength(10, {
    message: 'Phone number is too short. Minimal length is 10 characters',
  })
  @MaxLength(10, {
    message: 'Phone number is too long. Maximal length is 10 characters',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password is too short. Minimal length is 6 characters',
  })
  @MaxLength(40, {
    message: 'Password is too long. Maximal length is 40 characters',
  })
  password: string;
}
