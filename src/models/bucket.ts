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
import { User } from "./user";
import { UserAuth } from "./usersAuth";
  
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
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deleteAt: Date;

    @OneToOne(() => Currency)
    @JoinColumn()
    currency: Currency;
  
    @ManyToOne(() => User, user => user.buckets)
    @JoinColumn()
    user: User;

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
  