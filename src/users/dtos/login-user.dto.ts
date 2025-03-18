import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'test1',
        description: '유저아이디',
      })
    userid: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '1234',
        description: '비밀번호',
      })
    password: string;
}