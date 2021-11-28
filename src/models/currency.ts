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
import { UserAuth } from "./usersAuth";
  
  @Entity("currencies")
  export class Currency {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 200, nullable: false, name: 'currency_name' })
    currencyName: string;
  
    @Column({ type: "varchar", length: 10, nullable: false, name: 'currency_key'})
    currencyKey: false;
  }
  