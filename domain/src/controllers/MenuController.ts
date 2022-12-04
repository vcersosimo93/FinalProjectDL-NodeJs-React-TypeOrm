import { AppDataSource } from "../data-source";
import { Menu } from '../entity/Menu';
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

export const createMenu =  (req,res, next) =>{
  
    const esVegetariano = req.body.esVegetariano;
    const descripcion = req.body.descripcion;
  
    console.log("createMenu")
    console.log(esVegetariano)
    console.log(descripcion)
  
    const menu = new Menu();
    //menu.id = id
    menu.esVegetariano = esVegetariano
    menu.descripcion = descripcion
    AppDataSource.manager.save(menu)
    // Create post in db
    res.status(201).json({
      message: 'Post created successfully!',
      post: { esVegetariano: esVegetariano, descripcion: descripcion }
    });
  };

//Precarga Insert
export const insertMenuManager = async () =>{
    console.log("Se procede a insertar un menu.")
    const menu = new Menu()
    menu.esVegetariano = false;
    menu.descripcion = "Tortilla de Papas.";
    await AppDataSource.manager.save(menu)
    console.log("Se guardo el menú con el Id: " + menu.id)

    console.log("Cargando menus desde la base de datos...")
    const menus = await AppDataSource.manager.find(Menu)
    console.log("Los menus son: ", menus)
};