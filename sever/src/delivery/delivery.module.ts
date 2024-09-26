import { Module } from '@nestjs/common';
import { DeliveryGateway } from './delivery,getway';
import { DeliveryController } from './delivery.controller';

@Module({
    providers: [DeliveryGateway],
    controllers: [DeliveryController],
})
export class DeliveryModule {}
