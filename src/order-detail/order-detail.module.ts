import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entities/order-detail.entity';

@Module({
  controllers: [OrderDetailController],
  providers: [OrderDetailService],

  imports: [
      TypeOrmModule.forFeature([ OrderDetailEntity ])
  ]
})
export class OrderDetailModule {}
