import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserGender = 'Male' | 'Female'

@Entity()
export class User{
  @PrimaryGeneratedColumn('uuid')
  user_id!:string;

  @Column({type:'text', nullable:false})
  firts_name!:string;
  
  @Column({type:'text', nullable:false})
  last_name!:string;

  @Column({type:'numeric', nullable:false})
  age!:number;

  @Column({type:'enum',enum:['Male','Female']})
  gender!:UserGender;

  @Column({type:'date'})
  birthday!:Date;

  @Column('text', { unique:true})
  email!:string;

  @Column({type:'text'})
  address!:string;

  @Column({type:'text'})
  telephone!:string;

  @Column({type:'numeric', default:1})
  status!:number;
}