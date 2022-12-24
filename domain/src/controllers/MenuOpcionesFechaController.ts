import { AppDataSource } from "../data-source";
import { MenuOpcionesFecha } from '../entity/MenuOpcionesFecha';
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const manager = AppDataSource.manager

export const createMenuOpciones = async (req, res, next) => {
    try {
        const menuOpciones = new MenuOpcionesFecha();
        menuOpciones.menuId = req.body.menu;
        menuOpciones.fechaAPublicar = req.body.fechaAPublicar;
        menuOpciones.reaccion = req.body.reaccion;
        await manager.save(menuOpciones)

        res.status(201)
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const getMenusOpciones = async (req, res) => {
    try {
        const menusOpciones = await manager.find(MenuOpcionesFecha);
        return res.json({
            message: 'Menu Obtenidos Exitosamente.',
            menusOpciones: menusOpciones
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getMenusOpcionesFecha = async (req, res, next) => {
    try {
        const fecha = req.body.fechaAPublicar;
        const opcionesEncontradas = await manager.findBy(MenuOpcionesFecha, {
            fechaAPublicar: fecha
        }).then(opcionesEncontradas => {
            res.status(200).json({
                message: 'Fetched posts successfully.',
                opcionesEncontradas: opcionesEncontradas
            });
        })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

//ESTA MAL
export const findOpcionesPorFecha = async (fecha) => {
    const opciones = await AppDataSource.manager.findBy(MenuOpcionesFecha, fecha)
    return opciones
};
