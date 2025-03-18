import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from '../entity/menus.entity';
import { In, Repository } from 'typeorm';
import { CreateMenuDto, DeleteMenuDto, GetMenuDto } from './dtos';

@Injectable()
export class MenusService {
    constructor(
        @InjectRepository(MenuEntity)
        private readonly menuRepository: Repository<MenuEntity>
    ){}

    async getAllMenus(){
        return await this.menuRepository.find();
    }

    async getMenuForSearch(getMenuDto: GetMenuDto){
        const queryBuilder = this.menuRepository.createQueryBuilder('menu');

        if (getMenuDto.name) {
        queryBuilder.andWhere('menu.name LIKE :name', { name: `%${getMenuDto.name}%` });
        }

        if (getMenuDto.minPrice) {
        queryBuilder.andWhere('menu.price >= :minPrice', { minPrice: getMenuDto.minPrice});
        }

        if (getMenuDto.maxPrice) {
            queryBuilder.andWhere('menu.price <= :maxPrice', { maxPrice: getMenuDto.maxPrice });
            }

        return queryBuilder.getMany();
    }

    async createMenu(restaurant_id,createMenu: CreateMenuDto){
        return await this.menuRepository.save({
            restaurant_id,
            ...createMenu
        })
    }

    async deleteMenu(restaurant_id,deleteMenu: DeleteMenuDto){
        return await this.menuRepository.delete({
            restaurant:{
                id: restaurant_id
            } ,
            name: deleteMenu.name
        })
    }

    async getMenusByIds(menuIds: number[]){
        return await this.menuRepository.find({
            where:{ id: In(menuIds)},
        });
    }
}
