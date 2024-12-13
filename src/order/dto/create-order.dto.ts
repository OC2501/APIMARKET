import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {

    @IsDate()
    @IsNotEmpty()
    order: Date;

    @IsString()
    @IsNotEmpty()
    customer: string;

    @IsString()
    @IsNotEmpty()
    employee: string;

    @IsString()
    @IsNotEmpty()
    shipper: string;

}
