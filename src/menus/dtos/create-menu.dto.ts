import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MenuCategory } from "../enums/menus.enum";

export class CreateMenuDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsEnum(MenuCategory)
    category: MenuCategory;

    @IsString()
    description: string;

}