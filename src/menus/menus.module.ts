import { Module } from '@nestjs/common';
import { MenuEntity } from '../entity/menus.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusService } from './menus.service';

@Module({
    imports: [TypeOrmModule.forFeature([MenuEntity])],
      providers: [MenusService],
      exports: [MenusService, TypeOrmModule.forFeature([MenuEntity])],
})
export class MenusModule {}
