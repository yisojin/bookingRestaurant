import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString, IsTimeZone } from "class-validator";

export class CreateBookingDto{

    @IsString()
    @IsNotEmpty() 
    restaurant: string

    @IsDate()
    @IsString()
    @IsNotEmpty()
    bookingDate: Date | string;

    @IsDate()
    @IsString()
    @IsNotEmpty()
    startedAt: Date | string;

    @IsDate()
    @IsString()
    @IsNotEmpty()
    endedAt: Date | string;

    @IsNumber()
    numberOfPeople: number

    @IsString()
    @IsNotEmpty()
    phone: string
    
    @IsArray()
    menuIds: Array<number>

}