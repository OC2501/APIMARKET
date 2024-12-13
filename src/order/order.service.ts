import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { ApiAllResponse, ApiOneResponse } from 'src/common/interfaces/api-response.interface';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';

@Injectable()
export class OrderService {
 constructor(
     @InjectRepository(OrderEntity)
     private readonly OrderRepository: Repository<OrderEntity>
   ){}
   async create(createOrderDto: CreateOrderDto): Promise<ApiOneResponse<OrderEntity>> {
     try {
       const order = await this.OrderRepository.save( createOrderDto );
       if( !order ){
         throw new ManagerError({
           type: "CONFLICT",
           message: "Order not created!",
         })
       }
 
       return {
         status: {
           statusMsg: "CREATED",
           statusCode: HttpStatus.CREATED,
           error: null,
         },
         data: order,
       }
     } catch (error) {
       ManagerError.createSignatureError(error.message);
     }
   }
 
   async findAll( paginationDto: PaginationDto ): Promise<ApiAllResponse<OrderEntity>> {
     const { limit, page } = paginationDto;
     const skip = ( page - 1 ) * limit;
 
     try {
       
       const [ total, data ] = await Promise.all([
         this.OrderRepository.count({where: {isActive:true}}),
         this.OrderRepository.createQueryBuilder("Order")
         .where({isActive: true})
        .leftJoinAndSelect('order.customer', 'customer')
        .leftJoinAndSelect('order.employee', 'employee')
        .leftJoinAndSelect('order.shipper', 'shipper')
         .skip(skip)
         .limit(limit)
         .getMany(),
       ]);
       const lastPage = Math.ceil( page / limit );
       return {
         status: {
           statusMsg: "OK",
           statusCode: HttpStatus.OK,
           error: null,
         },
         meta: {
           page,
           lastPage,
           limit,
           total
         },
         data
       }
     } catch (error) {
       ManagerError.createSignatureError(error.message);
     }
   }
 
   async findOne(id: string): Promise<ApiOneResponse<OrderEntity>> {
     try {
      const order = await this.OrderRepository.createQueryBuilder('order')
      .where({ id, isActive: true })
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('order.employee', 'employee')
      .leftJoinAndSelect('order.shipper', 'shipper')
      .getOne()

       
       if( !order ){
         throw new ManagerError({
           type: "NOT_FOUND",
           message: "Order not found!",
         })
       }
 
       return {
         status: {
           statusMsg: "OK",
           statusCode: HttpStatus.OK,
           error: null,
         },
         data: order,
       }
     } catch (error) {
       ManagerError.createSignatureError(error.message);
     }
   }
 
   async update(id: string, updateOrderDto: UpdateOrderDto): Promise<ApiOneResponse<UpdateResult>> {
     try {
       const order = await this.OrderRepository.update( {id, isActive: true}, updateOrderDto );
       if( order.affected === 0 ){
         throw new ManagerError({
           type: "NOT_FOUND",
           message: "Order not found!",
         })
       }
 
       return {
         status: {
           statusMsg: "OK",
           statusCode: HttpStatus.OK,
           error: null,
         },
         data: order,
       }
     } catch (error) {
       ManagerError.createSignatureError(error.message);
     }
   }
 
   async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
     try {
       const order = await this.OrderRepository.update( {id, isActive: true}, {isActive: false} );
       if( order.affected === 0 ){
         throw new ManagerError({
           type: "NOT_FOUND",
           message: "Order not found!",
         })
       }
 
       return {
         status: {
           statusMsg: "OK",
           statusCode: HttpStatus.OK,
           error: null,
         },
         data: order,
       }
     } catch (error) {
       ManagerError.createSignatureError(error.message);
     }
   }
}
