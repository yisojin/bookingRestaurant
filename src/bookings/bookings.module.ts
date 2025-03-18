import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from '../entity/booking.entity';
import { BookingsService } from './bookings.service';

@Module({
    imports: [TypeOrmModule.forFeature([BookingEntity])],
      providers: [BookingsService],
      exports: [BookingsService, TypeOrmModule.forFeature([BookingEntity])],
})
export class BookingsModule {}
