import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

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