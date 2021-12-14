import { IsMobilePhone, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateTrainerDto {
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

  @Min(16, {
    message: 'Minimum age of a trainer is 16 years',
  })
  @Max(80, {
    message: 'Maximum age of a trainer is 80 years',
  })
  age: number;

  @Min(0, {
    message: 'Cost cannot be less than 0',
  })
  @Max(1000, {
    message: 'Cost cannot be more than 1000',
  })
  price: number;

  @IsMobilePhone()
  @MinLength(10, {
    message: 'Phone number is too short. Minimal length is 10 characters',
  })
  @MaxLength(10, {
    message: 'Phone number is too long. Maximal length is 10 characters',
  })
  phoneNumber: string;
  token: string;
  locationSport: object;
}
