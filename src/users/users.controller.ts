import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dtos/login-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
}
