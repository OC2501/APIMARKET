import { OrderEntity } from "./../../order/entities/order.entity";
import { BaseEntity } from "./../../common/config/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('employe')
export class EmployeeEntity extends BaseEntity {

    @Column({type: 'varchar'})
    lastname: string;
    @Column({type: 'varchar'})
    firstname: string;
    @Column({type: 'date'})
    birthdate: Date;
    @Column({type: 'varchar'})
    city: string;
    @Column({type: 'varchar'})
    photo: string;
    @Column({type: 'varchar'})
    note: string;

    @OneToMany(()=>OrderEntity, (order)=>order.employee)
    order: OrderEntity[];
}
