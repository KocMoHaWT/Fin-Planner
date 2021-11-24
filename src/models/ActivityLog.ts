import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { MovementDirection } from "../interfaces/moneyMovementDirection";
import { Bucket } from "./bucket";
import { Income } from "./income";

@Entity("activity_logs")
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "numeric", nullable: false })
  ammount: number;

  @Column({ type: "enum", nullable: false, enum: MovementDirection })
  direction: MovementDirection;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Income)
  @JoinColumn({ name: 'income_log_id'})
  income_logs_id: Income;

  @ManyToOne(() => Bucket)
  @JoinColumn({ name: 'bucket_log_id'})
  bucket_log_id: Bucket;
}
