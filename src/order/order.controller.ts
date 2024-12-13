import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

 @Post()
   create(@Body() createOrderDto: CreateOrderDto) {
     return this.orderService.create(createOrderDto);
   }
 
   @Get()
   findAll( @Query() paginationDto: PaginationDto ) {
     return this.orderService.findAll(paginationDto);
   }
 
   @Get(':id')
   findOne(@Param('id', ParseUUIDPipe) id: string) {
     return this.orderService.findOne(id);
   }
 
   @Patch(':id')
   update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
     return this.orderService.update(id, updateOrderDto);
   }
 
   @Delete(':id')
   remove(@Param('id', ParseUUIDPipe) id: string) {
     return this.orderService.remove(id);
   }
}
