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
import { BucketType } from "./bucketType";
import { Currency } from "./currency";
import { Account } from "./account";
import { UserAuth } from "./users-auth";
  
  @Entity("buckets")
  export class Bucket {
    @PrimaryGeneratedColumn("uuid")
    id: number;
  
    @Column({ type: "varchar", length: 200, nullable: false })
    title: string;
  
    @Column({ type: "varchar", nullable: false })
    description: string;

    @Column({ type: "numeric", nullable: false })
    check: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deleteAt: Date;

    @OneToOne(() => Currency)
    @JoinColumn()
    currency: Currency;
  
    @ManyToOne(() => Account, account => account.buckets)
    @JoinColumn()
    user: Account;

    @ManyToOne(() => BucketType, bucketType => bucketType.id)
    @JoinColumn()
    bucketType: BucketType;
  
    // @OneToMany(() => Comment, comment => comment.user)
    // @JoinColumn({ name: 'comments'})
    // comments: Comment[];
  
    // @OneToMany(() => PostLikes, post => post.user)
    // @JoinColumn()
    // post: PostLikes[];
  
    // @ManyToOne(() => Role)
    // @JoinColumn()
    // role: Role;
  }
  