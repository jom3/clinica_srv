import { DataSource } from "typeorm";
import { Auth, Department, Illness, Speciality, User } from "../entities";
import { Staff } from "../entities/staff.entity";
import { Attention } from "../entities/attention.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "clinica_db",
  synchronize: true,
  entities: [Auth, User, Department, Speciality, Staff, Illness, Attention],
})

const connection = () =>{
  AppDataSource.initialize()
      .then(() => {
        console.log('conected')
      })
      .catch((error) => console.log(error))
}

export {connection}