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
    PrimaryColumn,
  } from "typeorm";
import { Bucket } from "./bucket";
  
  @Entity("tags")
  export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 200, nullable: false, unique: true })
    value: string;

    @ManyToMany(() => Bucket)
    @JoinTable({
      name: "bucket_tags",
      joinColumn: {
          name: "tag",
          referencedColumnName: "id"
      },
      inverseJoinColumn: {
          name: "bucket_id",
          referencedColumnName: "id"
      }
  })
    categories: Bucket[];
  }
  