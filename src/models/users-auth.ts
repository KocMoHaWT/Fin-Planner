import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany,
  } from "typeorm";
  
  @Entity("users-auth")
  export class UserAuth {
    @PrimaryGeneratedColumn("uuid")
    id: number;
  
    @Column({ type: "varchar", nullable: true })
    refresh_token: string;
  }
  