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

  @ManyToMany(() => Income)
  @JoinTable({
    name: 'income_logs',
    joinColumn: {
      name: "activity_log",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "income_id",
      referencedColumnName: "id"
    }
  })
  income_logs: Income[];

  @ManyToMany(() => Bucket)
  @JoinTable({
    name: 'bucket_logs',
    joinColumn: {
      name: "activity_log",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "bucket_id",
      referencedColumnName: "id"
    }
  })
  bucket_logs: Bucket[];
}
