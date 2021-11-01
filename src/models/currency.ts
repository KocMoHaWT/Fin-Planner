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
import { UserAuth } from "./users-auth";
  
  @Entity("currencies")
  export class Currency {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 200, nullable: false })
    currencyName: string;
  
    @Column({ type: "varchar", length: 10, nullable: false })
    currencyKey: false;

  
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
  