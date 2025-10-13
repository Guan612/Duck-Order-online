import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class updateAssetDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
