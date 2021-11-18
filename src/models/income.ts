import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
  } from "typeorm";
import { Currency } from "./currency";
import { DateType } from "./date";
import { User } from "./user";
  
  @Entity("incomes")
  export class Income {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 200, nullable: false })
    name: string;
    

    @OneToOne(() => Currency)
    @JoinColumn()
    currency: Currency;

    @Column({ type: "boolean" })
    regular: boolean;

    @OneToOne(() => DateType)
    @JoinColumn()
    period: DateType;
  
    @ManyToOne(() => User)
    @JoinColumn()
    user: User[];
  }
  