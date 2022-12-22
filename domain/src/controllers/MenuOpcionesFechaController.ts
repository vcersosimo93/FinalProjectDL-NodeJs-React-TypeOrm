import { AppDataSource } from "../data-source";
import { MenuOpcionesFecha } from '../entity/MenuOpcionesFecha';
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

export const createMenuOpciones = (req, res, next) => {

    const menuId = req.body.menuId;
    const fechaAPublicar = req.body.fechaAPublicar;
    const reaccionId = req.body.reaccionId;

    console.log("createMenuOpciones")
    console.log(menuId)
    console.log(fechaAPublicar)

    const menuOpciones = new MenuOpcionesFecha();
    //menu.id = id
    menuOpciones.menuId = menuId
    menuOpciones.fechaAPublicar = fechaAPublicar
    menuOpciones.reaccion = reaccionId
    AppDataSource.manager.save(menuOpciones)
    // Create post in db
    res.status(201).json({
        message: 'Post created successfully!',
        post: { menuId: menuId, fechaAPublicar: fechaAPublicar , reaccion:reaccionId}
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

export const getMenusOpcionesFecha = (req, res, next) => {

        const fecha = req.body.fechaAPublicar;
    
        const opcionesEncontradas = AppDataSource.manager.findBy(MenuOpcionesFecha, {
            fechaAPublicar: fecha
        }).then(opcionesEncontradas => {
            res
                .status(200)
                .json({
                    message: 'Fetched posts successfully.',
                    opcionesEncontradas: opcionesEncontradas
                });
        })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    
        return opcionesEncontradas;
    };
    

    export const findOpcionesPorFecha = async (fecha) => {
        const opciones = await AppDataSource.manager.findBy(MenuOpcionesFecha, fecha)
        return opciones
    };
    