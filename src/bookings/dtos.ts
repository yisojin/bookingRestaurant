import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsTimeZone } from "class-validator";

export class CreateBookingDto{

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
        example: '2025-03-19 00:00:00',
        description: '예약날짜',
    })
    bookingDate: Date | string;

    @IsDate()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '2025-03-19 17:00:00',
        description: '예약시작시간',
    })
    startedAt: Date | string;

    @IsDate()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '2025-03-19 18:00:00',
        description: '예약종료시간',
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
        description: '메뉴 아이디 배얄',
    })
    menuIds: Array<number>

}

export class GetBookingDto{
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: '1234',
        description: '전화번호 일부검색',
    })
    phone?: string;

    @IsOptional()
    @IsDateString()
    @ApiProperty({
        example: '2025-03-19 17:30:00',
        description: '예약날짜검색',
    })
    date?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @ApiProperty({
        example: 1,
        description: '최소인원수 검색',
    })
    numberOfPeople?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: '짜장면',
        description: '특정메뉴 포함검색',
    })
    menu?: string;
}

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