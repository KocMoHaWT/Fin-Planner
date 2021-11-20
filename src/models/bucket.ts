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
import { Status } from "../chunks/bucket/bucket";
import { BucketType } from "./bucketType";
import { Currency } from "./currency";
import { Income } from "./income";
import { DateType } from "./date";
import { User } from "./user";

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

  @Column({ type: "varchar", nullable: false })
  tags: string;

  @Column({ type: 'enum', nullable: false, enum: Status, default: Status.empty })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToOne(() => DateType)
  @JoinColumn()
  period: DateType;

  @OneToOne(() => Income)
  @JoinColumn()
  linked_income: Income;

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
