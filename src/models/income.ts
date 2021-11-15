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
import { Currency } from "./currency";
import { User } from "./user";
  
  @Entity("incomes")
  export class Income {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 200, nullable: false })
    name: string;
  
    @Column({ type: "boolean", default: false})
    constant: false;

    @OneToOne(() => Currency)
    @JoinColumn()
    currency: Currency;
  
    @ManyToOne(() => User)
    @JoinColumn()
    account: User[];
  }
  