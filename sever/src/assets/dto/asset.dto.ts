import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateAssetDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
