import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class GetMenuDto{
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    minPrice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    maxPrice?: number;
}