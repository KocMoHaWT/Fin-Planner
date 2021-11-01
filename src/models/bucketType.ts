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
  
  @Entity("bucketsTypes")
  export class BucketType {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 200, nullable: false })
    title: string;
  
    @Column({ type: "numeric", nullable: false })
    min_check: number;

    @Column({ type: "numeric", nullable: false })
    max_check: number;
  
    @Column({ type: "boolean", nullable: false })
    leftover: boolean;
  
    @Column({ type: "boolean", nullable: false })
    regular: boolean;

    @Column({ type: "boolean", nullable: false })
    planned: boolean;
  
    @DeleteDateColumn()
    deleteAt: Date;
    
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
  