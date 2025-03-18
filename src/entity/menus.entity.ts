import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { BookingEntity } from "src/entity/booking.entity";
import { UserEntity } from "src/entity/users.entity";
import { MenuCategory } from "src/menus/enums";

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