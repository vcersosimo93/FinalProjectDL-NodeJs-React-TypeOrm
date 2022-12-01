import "reflect-metadata"
import { DataSource } from "typeorm"
import { DetalleMenu } from "./entity/DetalleMenu"
import { Empleado } from "./entity/Empleado"
import { Feedback } from "./entity/Feedback"
import { Horario } from "./entity/Horario"
import { Ingrediente } from "./entity/Ingrediente"
import { Menu } from "./entity/Menu"
import { Pedido } from "./entity/Pedido"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "ProyectoDL",
    synchronize: true, //Si no lo dejo en true no crea las tablas. 
    logging: false,
    entities: [DetalleMenu,Empleado,Feedback,Horario,Ingrediente,Menu,Pedido],
    migrations: [],
    subscribers: [],
})
