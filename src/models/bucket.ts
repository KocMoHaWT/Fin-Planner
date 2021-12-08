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
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Status } from "../chunks/bucket/bucket";
import { BucketType } from "./bucketType";
import { Currency } from "./currency";
import { Income } from "./income";
import { User } from "./user";
import { PeriodType } from "../interfaces/periodType";

@Entity("buckets")
export class Bucket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "numeric", nullable: true })
  parent_id: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: true })
  description: string;

  @Column({ type: "numeric", nullable: false })
  ammount: number;

  @Column({ type: 'enum', nullable: false, enum: Status, default: Status.empty })
  status: Status;

  @Column({ type: "date", nullable: true })
  date: Date;

  @Column({ type: "varchar",  nullable: true, name: 'currency'  })
  default_currency: Currency;

  @Column({ type: "enum", nullable: true, enum: PeriodType, default: PeriodType.once })
  period: PeriodType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Income, { nullable: true})
  @JoinColumn({ name: 'linked_income_id' })
  linked_income: Income;

  @ManyToOne(() => User, user => user.buckets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => BucketType, bucket_type => bucket_type.id)
  @JoinColumn({ name: 'bucket_type_id' })
  bucket_type: BucketType;
}
