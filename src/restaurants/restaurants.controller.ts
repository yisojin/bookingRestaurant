import { Controller, Post, Body } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantLoginDto } from './dtos/restaurant-login.dto';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantsService:RestaurantsService){}

    @Post('login')
    async login(@Body() loginDto:RestaurantLoginDto){

    }
}
