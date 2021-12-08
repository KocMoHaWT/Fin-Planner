import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
} from "typeorm";
import { Bucket } from "./bucket";
import { User } from "./user";

@Entity("notifications")
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "timestamp", nullable: false })
    data: Date;

    @Column({ type: "varchar", nullable: false })
    text: string;

    @Column({ type: "tinyint", default: 0 })
    sent: number;

    @Column({ type: "tinyint", default: 0 })
    read: number;

    @ManyToOne(() => Bucket)
    @JoinColumn({ name: 'bucket_id'})
    bucket_id: Bucket;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_to_notify'})
    user: User;
}