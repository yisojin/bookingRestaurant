import { Type } from "class-transformer";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class GetBookingDto{
    @IsOptional()
    @IsString()
    phone?: string; // 전화번호 일부 검색

    @IsOptional()
    @IsDateString()
    date?: string; // 예약 날짜 검색

    @IsOptional()
    @IsNumber()
    @Type(() => Number) // 숫자로 변환
    numberOfPeople?: number; // 최소 인원수 검색

    @IsOptional()
    @IsString()
    menu?: string; // 특정 메뉴 포함 검색
}