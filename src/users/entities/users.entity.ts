import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "../enums/users.enum";
import { MenuEntity } from "src/menus/entities/menus.entity";
import { BookingEntity } from "src/bookings/entities/booking.entity";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.USER,
      })
      userType: UserType;
    

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => BookingEntity, (booking) => booking.user)
    bookings: BookingEntity[];


    @OneToMany(() => MenuEntity, (menu) => menu.restaurant)
    menus: MenuEntity[];

}