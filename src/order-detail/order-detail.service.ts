import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { ApiAllResponse, ApiOneResponse } from 'src/common/interfaces/api-response.interface';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { OrderDetailEntity } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailService {
constructor(
    @InjectRepository(OrderDetailEntity)
    private readonly OrderDetailRepository: Repository<OrderDetailEntity>,
  ) { }

  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<ApiOneResponse<OrderDetailEntity>> {
    try {
      const orderDetail = await this.OrderDetailRepository.save(createOrderDetailDto);
      if (!orderDetail) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'OrderDetail not created!',
        });
      }
      return {
        status: {
          statusMsg: "CREATED",
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: orderDetail,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ApiAllResponse<OrderDetailEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.OrderDetailRepository.count({ where: { isActive: true } }),
        this.OrderDetailRepository.createQueryBuilder('OrderDetail')
          .where({ isActive: true })
          .leftJoinAndSelect('OrderDetail.order', 'order')
          .leftJoinAndSelect('OrderDetail.product', 'product')
          .take(limit)
          .skip(skip)
          .getMany()
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        meta: {
          page,
          limit,
          lastPage,
          total,
        },
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<ApiOneResponse<OrderDetailEntity>> {
    try {
      const orderDetail = await this.OrderDetailRepository.createQueryBuilder('OrderDetail')
        .where({ id, isActive: true })
        .leftJoinAndSelect('OrderDetail.order', 'order')
        .leftJoinAndSelect('OrderDetail.product', 'product')
        .getOne()

      if (!orderDetail) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'OrderDetail not found!',
        })
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: orderDetail,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const orderDetail = await this.OrderDetailRepository.update({ id, isActive: true }, updateOrderDetailDto);
      if (orderDetail.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'OrderDetail not found!',
        })
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: orderDetail,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const orderDetail = await this.OrderDetailRepository.update({ id, isActive: true }, { isActive: false });
      if (orderDetail.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'OrderDetail not found',
        });
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: orderDetail,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
