import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

 @Post()
   create(@Body() createEmployeeDto: CreateEmployeeDto) {
     return this.employeeService.create(createEmployeeDto);
   }
 
   @Get()
   findAll( @Query() paginationDto: PaginationDto ) {
     return this.employeeService.findAll(paginationDto);
   }
 
   @Get(':id')
   findOne(@Param('id', ParseUUIDPipe) id: string) {
     return this.employeeService.findOne(id);
   }
 
   @Patch(':id')
   update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
     return this.employeeService.update(id, updateEmployeeDto);
   }
 
   @Delete(':id')
   remove(@Param('id', ParseUUIDPipe) id: string) {
     return this.employeeService.remove(id);
   }
  
}
