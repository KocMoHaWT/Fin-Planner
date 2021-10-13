import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
  } from "typeorm";
import { User } from "./user";
  
  @Entity("users-auth")
  export class UserAuth {
    @PrimaryGeneratedColumn("uuid")
    id: number;
  
    @Column({ type: "varchar", nullable: true })
    refresh_token: string;

    @Column({ type: "varchar", nullable: true })
    google_identity: string;

    @Column({ type: "varchar", nullable: true })
    apple: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
  }
  