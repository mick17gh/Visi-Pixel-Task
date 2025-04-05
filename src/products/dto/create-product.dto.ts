/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @MinLength(3, { message: 'Description must be at least 3 characters long' })
  description: string;

  @Min(0, { message: 'Price must be at least 0' })
  price: number;

  @MinLength(3, { message: 'URL must be at least 3 characters long' })
  url: string;
}
