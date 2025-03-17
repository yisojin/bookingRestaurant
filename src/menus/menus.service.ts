import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from './entities/menus.entity';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dtos/create-menu.dto';

@Injectable()
export class MenusService {
    constructor(
        @InjectRepository(MenuEntity)
        private readonly menuRepository: Repository<MenuEntity>
    ){}

    async getAllMenus(){
        return await this.menuRepository.find();
    }

    async createMenu(restaurant_id,createMenu: CreateMenuDto){
        return await this.menuRepository.save({
            restaurant_id,
            ...createMenu
        })
    }

    async deleteMenu(){
        return await this.menuRepository.delete({
            
        })
    }
}
