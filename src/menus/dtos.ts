import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { MenuCategory } from "./enums";

export class CreateMenuDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '짜장면',
        description: '메뉴이름',
      })
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 8000,
        description: '메뉴가격',
      })
    price: number;

    @IsEnum(MenuCategory)
    @ApiProperty({
        example: 'CHINIESE',
        enum: MenuCategory,
        description: '메뉴카테고리',
      })
    category: MenuCategory;

    @IsString()
    @ApiProperty({
        example: '일요일은 짜파게티 요리사!',
        description: '메뉴상세설명',
      })
    description: string;

}

export class DeleteMenuDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '짜장면',
        description: '메뉴이름',
    })
    name: string;
}

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