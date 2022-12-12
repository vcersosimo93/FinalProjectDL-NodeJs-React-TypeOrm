import { AppDataSource } from "../data-source";
import { MenuOpcionesFecha } from '../entity/MenuOpcionesFecha';
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));


export const createMenuOpciones = (req, res, next) => {

    const menuId = req.body.menuId;
    const fechaAPublicar = req.body.fechaAPublicar;

    console.log("createMenuOpciones")
    console.log(menuId)
    console.log(fechaAPublicar)

    const menuOpciones = new MenuOpcionesFecha();
    //menu.id = id
    menuOpciones.menuId = menuId
    menuOpciones.fechaAPublicar = fechaAPublicar
    AppDataSource.manager.save(menuOpciones)
    // Create post in db
    res.status(201).json({
        message: 'Post created successfully!',
        post: { menuId: menuId, fechaAPublicar: fechaAPublicar }
    });
};


export const getMenusOpciones = (req, res, next) => {

    const menusOpciones = AppDataSource.manager.find(MenuOpcionesFecha)
        .then(menusOpciones => {
            res
                .status(200)
                .json({
                    message: 'Fetched posts successfully.',
                    menusOpciones: menusOpciones
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};