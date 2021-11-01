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
    JoinTable,
  } from "typeorm";
import { Bucket } from "./bucket";
  
  @Entity("tags")
  export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 200, nullable: false })
    value: string;

    @OneToOne(() => Tag)
    @JoinColumn()
    tag: Tag;

    @ManyToMany(() => Bucket)
    @JoinTable()
    categories: Bucket[];
  }
  