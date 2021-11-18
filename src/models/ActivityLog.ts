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
    ManyToMany,
  } from "typeorm";
import { BucketType } from "./bucketType";
import { Currency } from "./currency";
import { Income } from "./income";
import { User } from "./user";
import { UserAuth } from "./usersAuth";
  
  @Entity("activityLogs")
  export class Bucket {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Bucket)
    @JoinColumn()
    bucket: Bucket;

    @Column({ type: "numeric", nullable: false })
    sum: number;

    @OneToOne(() => Income)
    @JoinColumn()
    income: Income;
  }
  