import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
  } from "typeorm";
import { User } from "./user";
  
  @Entity("usersauth")
  export class UserAuth {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", nullable: true })
    refresh_token: string;

    @Column({ type: "varchar", nullable: true })
    google: string;

    @Column({ type: "varchar", nullable: true })
    apple: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;
  }
  