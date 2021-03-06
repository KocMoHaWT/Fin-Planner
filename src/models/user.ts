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
  
    @Column({ type: "varchar",  nullable: true  })
    password: string;
  
    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deleteAt: Date;

    @OneToOne(() => UserAuth)
    @JoinColumn()
    authentication: UserAuth;

    @Column({ type: "varchar",  nullable: true, name: 'default_currency'  })
    default_currency: Currency;
    
    @OneToMany(() => Bucket, bucket => bucket.user)
    buckets: Bucket[];
  }
  