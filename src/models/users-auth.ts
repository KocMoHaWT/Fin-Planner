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
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", nullable: true })
    refresh_token: string;

    @Column({ type: "varchar", nullable: true })
    googleIdentity: string;

    @Column({ type: "varchar", nullable: true })
    appleIidentity: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
  }
  