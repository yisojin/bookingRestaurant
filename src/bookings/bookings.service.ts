import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/users.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { MenuEntity } from 'src/menus/entities/menus.entity';

@Injectable()
export class BookingsService {

    constructor(
        @InjectRepository(BookingEntity)
        private readonly bookingRepository: Repository<BookingEntity>
    ){}

    async getAllBooking(user:UserEntity){
        return await this.bookingRepository.find({ 
            relations: ['menus'],
            where: {
            user: {
                id: user.id
            }
        }})
    }

    async createBooking(user:UserEntity,menus:MenuEntity[],createBookingDto: CreateBookingDto){
        return await this.bookingRepository.save({ user,
                    menus,
                ...createBookingDto
            });
    }

    async bookingValidate(createBookingDto:CreateBookingDto){
        const queryBuilder = this.bookingRepository.createQueryBuilder('bookings');
        queryBuilder.andWhere('bookings.restaurant = :restaurant', {restaurant: createBookingDto.restaurant});
        queryBuilder.andWhere('bookings.startedAt <= :startedAt and bookings.endedAt >= :startedAt', {startedAt:createBookingDto.startedAt});
        return queryBuilder.getCount();
    }
}
