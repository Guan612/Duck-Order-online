import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateBorrowlogDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  assetsId: number;

  @IsNumber()
  @IsOptional()
  borrowStatus?: number;

  @IsDate()
  @IsOptional()
  borrowArt?: Date;

  @IsDate()
  @IsOptional()
  backArt?: Date;
}

export class UpdateBorrowlogDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  assetsId: number;

  @IsNumber()
  @IsNotEmpty()
  borrowStatus: number;

  @IsDate()
  @IsOptional()
  borrowArt?: Date;

  @IsDate()
  @IsOptional()
  backArt?: Date;
}
