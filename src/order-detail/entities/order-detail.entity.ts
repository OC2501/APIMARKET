import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { ProductEntity } from "./../../products/entities/product.entity";
import { OrderEntity } from "./../../order/entities/order.entity";

@Entity('order_detail')
export class OrderDetailEntity extends BaseEntity{
    @Column({type: 'int'})
    quantity: number;
    
    @ManyToOne(()=>ProductEntity, (product)=>product.orderDetail)
    @JoinColumn({name: 'product_id'})
    product: string;
    
    @ManyToOne(()=> OrderEntity, (order)=>order.orderDetail)
    @JoinColumn({name:'warehouse_id'})
    order: string;
}
