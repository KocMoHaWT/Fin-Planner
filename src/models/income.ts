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
import { User } from "./user";
import { UserAuth } from "./users-auth";
  
  @Entity("incomes")
  export class Income {
    @PrimaryGeneratedColumn("uuid")
    id: number;
  
    @Column({ type: "varchar", length: 200, nullable: false })
    name: string;
  
    @Column({ type: "boolean", default: false})
    constant: false;
  
    @ManyToOne(() => User)
    @JoinColumn()
    user: User[];
  
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
  