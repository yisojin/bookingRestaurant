import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { GetUser } from 'src/auth/auth.decorator';
import { UserEntity } from 'src/users/entities/users.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { MenusService } from 'src/menus/menus.service';
import { GetBookingDto } from './dtos/get-booking.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BookingEntity } from './entities/booking.entity';

@Controller('bookings')
export class BookingsController {

    constructor(private bookingService: BookingsService, private menuService: MenusService){}

    @ApiOperation({summary:'예약조회'})
    // @ApiQuery({
    //     name: 'name',
    //     enum: ['enum1', 'enum2'],
    //   })
    @UseGuards(JwtAuthGuard)
    @Get()
    async getBooking(@GetUser() user:UserEntity, @Query() getBookingDto: GetBookingDto){
        return await this.bookingService.getAllBooking(user, getBookingDto);
    }

    @ApiOperation({summary:'예약등록'})
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

    @ApiOperation({summary:'예약수정'})
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateBooking(
        @GetUser() user:UserEntity,
        @Param('id') id: number,
        @Body() updateBookingDto: CreateBookingDto 
    ){
        const menus = await this.menuService.getMenusByIds(updateBookingDto.menuIds);
        return await this.bookingService.updateBooking(id, user, updateBookingDto, menus);
    }

    @ApiOperation({summary:'예약삭제'})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteBooking(
        @GetUser() user: UserEntity,
        @Param('id') id:number 
    ){
        return await this.bookingService.deleteBooking(id, user);
    }
}
