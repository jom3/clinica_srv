import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Speciality{

  @PrimaryGeneratedColumn()
  speciality_id!:string;

  @Column({type:'text', nullable:false})
  name!:string;

  @Column({type:'text', nullable:true})
  desc!:string;

  @Column({type:'numeric', default:1})
  status!:number;
}