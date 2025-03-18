import { MenuEntity } from "src/entity/menus.entity";
import { UserEntity } from "src/entity/users.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({ name: 'bookings' })
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    restaurant: string;

    @ManyToOne(() => UserEntity, (user) => user.bookings)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToMany(() => MenuEntity, (menu) => menu.bookings)
    @JoinTable({
    name: 'booking_menus',
    joinColumn: { name: 'bookingId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'menuId', referencedColumnName: 'id' },
    })
    menus: MenuEntity[];

    @Column()
    bookingDate: Date;

    @Column()
    startedAt: Date;

    @Column()
    endedAt: Date;

    @Column()
    numberOfPeople: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}