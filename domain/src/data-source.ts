import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.BD_HOST,
    port: parseInt(process.env.BD_PORT),
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME,


    synchronize: true, //Si no lo dejo en true no crea las tablas. 
    logging: false,
    entities: [__dirname + "/entity/*.ts"],
    migrations: [],
    subscribers: [],
})
