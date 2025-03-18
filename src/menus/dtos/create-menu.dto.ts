import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MenuCategory } from "../enums/menus.enum";
import { ApiProperty } from "@nestjs/swagger";

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