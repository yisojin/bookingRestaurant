import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString, IsTimeZone } from "class-validator";

export class updateBookingDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '용광루',
        description: '식당이름',
    })
    restaurant: string

    @IsDate()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '예약날짜',
        description: '2025-03-19 00:00:00',
    })
    bookingDate: Date | string;

    @IsDate()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '예약시작시간',
        description: '2025-03-19 17:00:00',
    })
    startedAt: Date | string;

    @IsDate()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '예약종료시간',
        description: '2025-03-19 18:00:00',
    })
    endedAt: Date | string;

    @IsNumber()
    @ApiProperty({
        example: 3,
        description: '인원수',
    })
    numberOfPeople: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '01012341234',
        description: '전화번호',
    })
    phone: string
    
    @IsArray()
    @ApiProperty({
        example: [1,2],
        description: '메뉴 아이디배열',
    })
    menuIds: Array<number>

}