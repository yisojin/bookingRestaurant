import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class GetMenuDto{
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: '짜장면',
        description: '검색할 메뉴이름',
    })
    name?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        example: 100,
        description: '최소가격',
    })
    minPrice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        example: 10000,
        description: '최대가격',
    })
    maxPrice?: number;
}