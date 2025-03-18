import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { MenuCategory } from "../enums/menus.enum";
import { BookingEntity } from "src/bookings/entities/booking.entity";
import { UserEntity } from "src/users/entities/users.entity";

@Entity({ name: 'menus' })
export class MenuEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => UserEntity, (user) => user.menus)
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: UserEntity;

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

    @OneToMany(() => BookingEntity, (booking) => booking.menus)
    bookings: BookingEntity[];
    
}