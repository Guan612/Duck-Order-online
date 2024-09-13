export class CreateOrderDto {
  userId: number;
  orderStatus?: number;
  orderType?: number;
  orderTime?: Date;
  totalPrice: number;
}
