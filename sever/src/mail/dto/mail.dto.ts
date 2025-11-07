import { IsNotEmpty } from 'class-validator';

export class CreateMailDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
}

export class UpdateMailDto {}
