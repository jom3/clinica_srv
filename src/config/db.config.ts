import { DataSource } from "typeorm";
import { Auth, User } from "../entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "clinica_db",
  synchronize: true,
  entities: [Auth, User],
})

const connection = () =>{
  AppDataSource.initialize()
      .then(() => {
        console.log('conected')
      })
      .catch((error) => console.log(error))
}

export {connection}