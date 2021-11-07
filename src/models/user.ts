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
import { Bucket } from "./bucket";
import { Currency } from "./currency";
import { UserAuth } from "./usersAuth";
  
  @Entity("users")
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 200, nullable: false })
    name: string;
  
    @Column({ type: "varchar", length: 200, nullable: false })
    email: string;
  
    @Column({ type: "varchar", nullable: false })
    password: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deleteAt: Date;

    @OneToOne(() => UserAuth)
    @JoinColumn()
    authentication: UserAuth;

    @OneToOne(() => Currency)
    @JoinColumn()
    defaultCurrency: Currency;
    
    @OneToMany(() => Bucket, bucket => bucket.user)
    buckets: Bucket[];
  }
  