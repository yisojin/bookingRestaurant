import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({ name: 'bookings' })
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    restaurant_id: number;

    @Column()
    user_id: number;

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