import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Department } from './department.entity';
import { Speciality } from './speciality.entity';

@Entity()
export class Staff{

  @PrimaryGeneratedColumn('uuid')
  staff_id!:string;

  @Column({type:'timestamp'})
  started_at!:Date;

  @Column({type:'timestamp', nullable:true})
  updated_at!:Date;

  @Column({type:'timestamp', nullable:true})
  finished_at!:Date;

  @Column({type:'numeric', default:1})
  status!:number;

  @OneToOne(()=>User,{
    eager:true, cascade:true
  })
  @JoinColumn({name:'user_id'})
  user!:string;

  @OneToOne(()=>Department,{
    eager:true, cascade:true,
  })
  @JoinColumn({name:'department_id'})
  department!:string;

  @OneToOne(()=>Speciality,{
    eager:true, cascade:true
  })
  @JoinColumn({name:'speciality_id'})
  speciality!:string;

  @BeforeInsert()
  checkInsert(){
    this.started_at = new Date()
  }

  @BeforeUpdate()
  checkUpdate(){
    this.updated_at = new Date()
  }
}

