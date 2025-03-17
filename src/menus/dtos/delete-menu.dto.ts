import { IsNotEmpty, IsString } from "class-validator";

export class DeleteMenuDto{
    @IsString()
    @IsNotEmpty()
    name: string;
}