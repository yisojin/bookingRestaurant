import { MenuEntity } from "src/menus/entities/menus.entity";
import { UserEntity } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({ name: 'bookings' })
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(()=>UserEntity)
    user: UserEntity;

    @ManyToMany(()=>MenuEntity)
    menus: MenuEntity

    @Column()
    bookingDate: Date;

    @Column()
    startedAt: string;

    @Column()
    endedAt: string;

    @Column()
    numberOfPeople: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}