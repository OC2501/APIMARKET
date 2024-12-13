import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsDate()
    @IsNotEmpty()
    birthdate: Date;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    photo: string;

    @IsString()
    @IsNotEmpty()
    note: string;
}
