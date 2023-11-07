import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Staff } from './staff.entity';
import { User } from "./user.entity";

@Entity()
export class Attention{

  @PrimaryGeneratedColumn('uuid')
  attention_id!:string;

  @Column({type:'timestamp', nullable:true})
  create_at!:Date;

  @Column({type:'timestamp', nullable:true})
  served_at!:Date;

  @Column({type:'numeric', default:1})
  status!:number;

  @ManyToOne(()=>Staff,{
    eager:true, cascade:true
  })
  @JoinColumn({name:'staff_id'})
  staff!:string;
  
  @ManyToOne(()=>User,(user)=>user.attention,{
    eager:true,
    cascade:true
  })
  @JoinColumn({name:'user_id'})
  user!:string
}