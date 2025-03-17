import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { MenuCategory } from "../enums/menus.enum";

@Entity({ name: 'menus' })
export class MenuEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    restaurant_id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({
        type: 'enum',
        enum: MenuCategory,
        default: MenuCategory.NONE
    })
    category: MenuCategory;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}