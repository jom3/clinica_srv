import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Staff } from "./staff.entity";

@Entity()
export class Speciality{

  @PrimaryGeneratedColumn('uuid')
  speciality_id!:string;

  @Column({type:'text', nullable:false})
  name!:string;

  @Column({type:'text', nullable:true})
  desc!:string;

  @Column({type:'numeric', default:1})
  status!:number;

  @OneToMany(()=>Staff,(staff)=>staff.speciality)
  staff!:Staff;
}