import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Staff } from "./staff.entity";

@Entity()
export class Department{

  @PrimaryGeneratedColumn('uuid')
  department_id!:string;

  @Column({type:'text', nullable:false})
  name!:string;

  @Column({type:'text', nullable:true})
  desc!:string;

  @Column({type:'numeric', default:1})
  status!:number;

  @OneToOne(()=>Staff,(staff)=>staff.department)
  staff!:Staff;
}