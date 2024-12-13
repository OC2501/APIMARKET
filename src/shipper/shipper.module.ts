import { Module } from '@nestjs/common';
import { ShipperService } from './shipper.service';
import { ShipperController } from './shipper.controller';
import { ShipperEntity } from './entities/shipper.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ShipperController],
  providers: [ShipperService],
  imports: [
        TypeOrmModule.forFeature([ShipperEntity]),
      ]
})
export class ShipperModule {}
