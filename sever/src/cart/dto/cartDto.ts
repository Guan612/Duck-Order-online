import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  menuId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  quantity: number;
}
