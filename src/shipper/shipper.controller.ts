import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ShipperService } from './shipper.service';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';

@Controller('shipper')
export class ShipperController {
  constructor(private readonly shipperService: ShipperService) {}

 @Post()
    create(@Body() createShipperDto: CreateShipperDto) {
      return this.shipperService.create(createShipperDto);
    }
  
    @Get()
    findAll( @Query() paginationDto: PaginationDto ) {
      return this.shipperService.findAll(paginationDto);
    }
  
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.shipperService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateShipperDto: UpdateShipperDto) {
      return this.shipperService.update(id, updateShipperDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.shipperService.remove(id);
    }
}
