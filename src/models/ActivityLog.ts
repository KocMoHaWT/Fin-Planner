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
  
  @Entity("activityLogs")
  export class Bucket {
    @PrimaryGeneratedColumn()
    id: number;

  }
  