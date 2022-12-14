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

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "Vicente",
    password: "Jovenesv4",
    database: "proyectodl",
    synchronize: true, //Si no lo dejo en true no crea las tablas. 
    logging: false,
    entities: [DetalleMenu,Empleado,Feedback,Horario,Ingrediente,Menu,Pedido,MenuOpcionesFecha],
    migrations: [],
    subscribers: [],
})


/*
VICE
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "Vicente",
    password: "Jovenesv4",
    database: "proyectodl",
    synchronize: true, //Si no lo dejo en true no crea las tablas. 
    logging: false,
    entities: [DetalleMenu,Empleado,Feedback,Horario,Ingrediente,Menu,Pedido],
    migrations: [],
    subscribers: [],

NICO
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "proyectoDL",
    synchronize: true, //Si no lo dejo en true no crea las tablas. 
    logging: false,
    entities: [DetalleMenu,Empleado,Feedback,Horario,Ingrediente,Menu,Pedido],
    migrations: [],
    subscribers: [],

NOE
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "Noe",
    password: "Noe12345678!",
    database: "proyectoDL",
    synchronize: true, //Si no lo dejo en true no crea las tablas. 
    logging: false,
    entities: [DetalleMenu,Empleado,Feedback,Horario,Ingrediente,Menu,Pedido],
    migrations: [],
    subscribers: [],
*/