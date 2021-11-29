import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PeriodType } from "../interfaces/periodType";
import { Currency } from "./currency";
import { User } from "./user";

@Entity("incomes")
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  title: string;

  @Column({ type: "numeric", nullable: false })
  ammount: number;

  @Column({ type: "date", nullable: true })
  date: Date;

  @Column({ type: "enum", enum: PeriodType, nullable: true, default: PeriodType.once })
  period: PeriodType;

  @Column({ type: "varchar",  nullable: true, name: 'currency'  })
  default_currency: string;

  @Column({ type: "boolean", default: false })
  regular: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id'})
  user: User;
}
