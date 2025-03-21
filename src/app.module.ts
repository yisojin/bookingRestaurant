import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UserEntity } from './entity/users.entity';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsService } from './bookings/bookings.service';
import { BookingsModule } from './bookings/bookings.module';
import { MenusController } from './menus/menus.controller';
import { MenusService } from './menus/menus.service';
import { MenusModule } from './menus/menus.module';
import { UsersService } from './users/users.service';
import { MenuEntity } from './entity/menus.entity';
import { BookingEntity } from './entity/booking.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '12345678',
      database: process.env.DB_DATABASE || 'booking',
      entities: [ UserEntity, MenuEntity, BookingEntity ],
      synchronize:true,
    }),
    UsersModule,
    BookingsModule,
    MenusModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController, BookingsController, MenusController, AuthController],
  providers: [AppService, BookingsService, MenusService, UsersService, AuthService, JwtService],
})
export class AppModule {}
