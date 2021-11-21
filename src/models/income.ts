import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { PeriodType } from "../interfaces/periodType";
import { Currency } from "./currency";
import { User } from "./user";

@Entity("incomes")
export class Income {
  @PrimaryColumn()
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  name: string;

  @Column({ type: "numeric", nullable: false })
  amount: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "enum", enum: PeriodType, default: PeriodType.once })
  period: PeriodType;

  @Column({ type: "boolean" })
  regular: boolean;

  @OneToOne(() => Currency)
  @JoinColumn()
  currency: Currency;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User[];
}
