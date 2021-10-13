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
import { User } from "./user";
  
  @Entity("incomes")
  export class Income {
    @PrimaryGeneratedColumn("uuid")
    id: number;
  
    @Column({ type: "varchar", length: 200, nullable: false })
    name: string;
  
    @Column({ type: "boolean", default: false})
    constant: false;
  
    @ManyToOne(() => User)
    @JoinColumn()
    account: User[];
  }
  