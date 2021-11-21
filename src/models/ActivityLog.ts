import {
    Entity,
    PrimaryColumn,
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
  
  @Entity("activity_logs")
  export class Bucket {
    @PrimaryColumn()
    id: number;

    @OneToOne(() => Bucket)
    @JoinColumn({ name: 'bucket_id'})
    bucket: Bucket;

    @Column({ type: "numeric", nullable: false })
    sum: number;

    @OneToOne(() => Income)
    @JoinColumn({ name: 'income_id'})
    income: Income;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;
  }
  