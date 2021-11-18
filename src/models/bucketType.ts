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
import { Income } from "./income";
  
  @Entity("bucketsTypes")
  export class BucketType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 200, nullable: true })
    title: string;

    @Column({ type: "boolean", nullable: true })
    regular: boolean;

    @Column({ type: "boolean", nullable: true })
    strict: boolean;

    @Column({ type: "boolean", nullable: true })
    planned: boolean;

    @Column({ type: "boolean", nullable: true })
    leftover: boolean;
  
    @DeleteDateColumn()
    deleteAt: Date;
  }
  