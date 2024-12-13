import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDetailDto {
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    order: string;

    @IsString()
    @IsNotEmpty()
    product: string;
}
