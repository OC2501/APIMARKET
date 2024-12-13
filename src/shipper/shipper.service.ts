import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { ApiAllResponse, ApiOneResponse } from 'src/common/interfaces/api-response.interface';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipperEntity } from './entities/shipper.entity';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';


@Injectable()
export class ShipperService {
  constructor(
      @InjectRepository(ShipperEntity)
      private readonly ShippersRepository: Repository<ShipperEntity>
    ){}
    async create(createShipperDto: CreateShipperDto): Promise<ApiOneResponse<ShipperEntity>> {
      try {
        const shipper = await this.ShippersRepository.save( createShipperDto );
        if( !shipper ){
          throw new ManagerError({
            type: "CONFLICT",
            message: "Shipper not created!",
          })
        }
  
        return {
          status: {
            statusMsg: "CREATED",
            statusCode: HttpStatus.CREATED,
            error: null,
          },
          data: shipper,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async findAll( paginationDto: PaginationDto ): Promise<ApiAllResponse<ShipperEntity>> {
      const { limit, page } = paginationDto;
      const skip = ( page - 1 ) * limit;
  
      try {
        
        const [ total, data ] = await Promise.all([
          this.ShippersRepository.count({where: {isActive:true}}),
          this.ShippersRepository.createQueryBuilder("Shipper")
          .where({isActive: true})
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
  
    async findOne(id: string): Promise<ApiOneResponse<ShipperEntity>> {
      try {
        const shipper = await this.ShippersRepository.findOne( { where: {id, isActive: true} } );
        if( !shipper ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "Shipper not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: shipper,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async update(id: string, updateShipperDto: UpdateShipperDto): Promise<ApiOneResponse<UpdateResult>> {
      try {
        const shipper = await this.ShippersRepository.update( {id, isActive: true}, updateShipperDto );
        if( shipper.affected === 0 ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "Shipper not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: shipper,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
      try {
        const shipper = await this.ShippersRepository.update( {id, isActive: true}, {isActive: false} );
        if( shipper.affected === 0 ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "Shipper not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: shipper,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
}
