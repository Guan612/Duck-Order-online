import { IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator";

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  pictureUrl?: string;

  @IsOptional()
  @IsNumber()
  isSell?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
