import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Auth {
  @PrimaryColumn()
  user_id!: string;

  @Column({ type: "text", nullable: false })
  username!: string;

  @Column({ type: "text", nullable: false })
  password!: string;

  @OneToOne(() => User, (user) => user.auth)
  @JoinColumn({name:'user_id'})
  user!: User;
}
