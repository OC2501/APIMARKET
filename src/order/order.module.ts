import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from 'src/order-detail/entities/order-detail.entity';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
        TypeOrmModule.forFeature([ OrderDetailEntity ])
    ]
})
export class OrderModule {}
