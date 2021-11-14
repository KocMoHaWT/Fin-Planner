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
import { BucketType } from "./bucketType";
import { Currency } from "./currency";
import { User } from "./user";
import { UserAuth } from "./usersAuth";
  
  @Entity("buckets")
  export class Bucket {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 200, nullable: false })
    title: string;
  
    @Column({ type: "varchar", nullable: false })
    description: string;

    @Column({ type: "numeric", nullable: false })
    check: number;

    @Column({ type: "numeric", nullable: false })
    currentAmmount: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deleteAt: Date;

    @OneToOne(() => Currency)
    @JoinColumn()
    currency: Currency;
  
    @ManyToOne(() => User, user => user.buckets)
    @JoinColumn()
    user: User;

    @ManyToOne(() => BucketType, bucket_type => bucket_type.id)
    @JoinColumn()
    bucket_type: BucketType;
  }
  