import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
  } from "typeorm";
import { Bucket } from "../chunks/bucket/bucket";
import { PeriodType } from "../interfaces/periodType";
import { Income } from "./income";
  
  @Entity("dates")
  export class DateType {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 200, nullable: false })
    title: string;
  
    @Column({ type: "boolean", default: false})
    code: false;

    @Column({ type: "numeric", nullable: false })
    amount: number;

    @Column({ type: "date"})
    date: Date;

    @Column({ type: "enum", default: PeriodType.once })
    period: PeriodType

    @OneToOne(() => Income)
    @JoinColumn()
    income: Income;

    @OneToOne(() => Bucket)
    @JoinColumn()
    bucket: Bucket;
  }
  