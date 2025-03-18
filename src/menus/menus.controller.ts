import { Body, Controller, Delete, Get, Post, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { GetUser } from 'src/auth/auth.decorator';
import { UserEntity } from 'src/entity/users.entity';
import { UserType } from 'src/users/enums';
import { CreateMenuDto, DeleteMenuDto, GetMenuDto } from './dtos';

@Controller('menus')
export class MenusController {

    constructor(private menuService: MenusService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMenus(){
        return await this.menuService.getAllMenus();
    }

    @UseGuards(JwtAuthGuard)
    @Get('search')
    async getMenuForSearch(@Query() getMenuDto: GetMenuDto){
        return await this.menuService.getMenuForSearch(getMenuDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createMenu(
        @GetUser() user:UserEntity,
        @Body() createMenuDto: CreateMenuDto){
            if(user.userType !== UserType.RESTAURANT){
                throw new UnauthorizedException('접근권한이없습니다.')
            }            
        return await this.menuService.createMenu(user.id,createMenuDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteMenu(
        @GetUser() user:UserEntity,
        @Body() deleteMenuDto: DeleteMenuDto){
        return await this.menuService.deleteMenu(user.id,deleteMenuDto)
    }
}
