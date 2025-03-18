import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/users.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { MenuEntity } from 'src/menus/entities/menus.entity';
import { UserType } from 'src/users/enums/users.enum';

@Injectable()
export class BookingsService {

    constructor(
        @InjectRepository(BookingEntity)
        private readonly bookingRepository: Repository<BookingEntity>
    ){}

    async getAllBooking(user:UserEntity, getBookingDto){
        const queryBuilder = this.bookingRepository.createQueryBuilder('bookings');
        
        if(getBookingDto.phone){
            queryBuilder.andWhere('bookings.phone like :phone', {phone: `%${getBookingDto.phone}%`});
        }
        if(getBookingDto.date){
            queryBuilder.andWhere('booking.bookingDate between :date and :date2', {date: getBookingDto.date+' 00:00:00', date2: getBookingDto.date+' 23:59:59'});
        }
        if(getBookingDto.numberOfPeople){
            queryBuilder.andWhere('bookings.numberOfPeople <= :number', {number: getBookingDto.numberOfPeople});
        }
        if(getBookingDto.menu){
            queryBuilder.innerJoin('bookings.menus','menus').where('menus.name like :name',{name: `%${getBookingDto.menu}%`})
        }
        if(user.userType === UserType.RESTAURANT){
            queryBuilder.andWhere('bookings.restaurant = :restaurant',{restaurant: user.username});
        }
        if(user.userType === UserType.USER){
            queryBuilder.andWhere('bookings.userID = :id',{id: user.id});
        }
        return await queryBuilder.getMany()

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

    async updateBooking(id, user, updateBookingDto, menus){
        const booking = await this.bookingRepository.findOne({ 
            where:
                [{
                    id: id
                }, 
                {
                    user: user
                }]
            });

        if (!booking) {
            throw new NotFoundException('예약을 찾을수없습니다.');
        }

        return await this.bookingRepository.save({
            user,menus,...updateBookingDto
        });
    
    }

    async deleteBooking(id, user){
        const booking = await this.bookingRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('예약을 찾을수없습니다.');
        }
    
        return await this.bookingRepository.delete({
            id:id
        });
    }
}
