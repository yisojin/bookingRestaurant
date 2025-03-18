import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteMenuDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '짜장면',
        description: '메뉴이름',
    })
    name: string;
}