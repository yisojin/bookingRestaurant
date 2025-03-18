import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { GetUser } from 'src/auth/auth.decorator';
import { UserEntity } from 'src/users/entities/users.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { MenusService } from 'src/menus/menus.service';

@Controller('bookings')
export class BookingsController {

    constructor(private bookingService: BookingsService, private menuService: MenusService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllBooking(@GetUser() user:UserEntity){
        return await this.bookingService.getAllBooking(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createBooking(
        @GetUser() user: UserEntity,
        @Body() createBookingDto: CreateBookingDto
    ){
        if(createBookingDto.numberOfPeople < 1) {
            throw new BadRequestException('인원은 1명이상이어야합니다.');
        }
        if(createBookingDto.endedAt <= createBookingDto.startedAt){
            throw new BadRequestException('예약종료시간이 잘못되었습니다.');
        }
        const validate = await this.bookingService.bookingValidate(createBookingDto);
        if(validate > 0){
            throw new BadRequestException('이미 예약된 시간입니다.');
        }
        const menus = await this.menuService.getMenusByIds(createBookingDto.menuIds);
        return await this.bookingService.createBooking(user,menus,createBookingDto)
    }
}
