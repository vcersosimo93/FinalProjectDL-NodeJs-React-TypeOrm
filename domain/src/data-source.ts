import "reflect-metadata"
import { DataSource } from "typeorm"
import { DetalleMenu } from "./entity/DetalleMenu"
import { Empleado } from "./entity/Empleado"
import { Feedback } from "./entity/Feedback"
import { Horario } from "./entity/Horario"
import { Ingrediente } from "./entity/Ingrediente"
import { Menu } from "./entity/Menu"
import { MenuOpcionesFecha } from "./entity/MenuOpcionesFecha"
import { Pedido } from "./entity/Pedido"
import {config as configDotenv} from 'dotenv'
import {resolve} from 'path'

configDotenv({
    path: resolve(__dirname, "./.env")
  })

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.BD_HOST,
    port: parseInt(process.env.BD_PORT),
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME,


    synchronize: true, //Si no lo dejo en true no crea las tablas. 
    logging: false,
    entities: [DetalleMenu,Empleado,Feedback,Horario,Ingrediente,Menu,Pedido,MenuOpcionesFecha],
    migrations: [],
    subscribers: [],
})
