import { AppDataSource } from "../data-source";
import { MenuOpcionesFecha } from '../entity/MenuOpcionesFecha';
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const manager = AppDataSource.manager

export const createMenuOpciones = async (req, res, next) => {
    try {
        const menuId = req.body.menuId;
        const fechaAPublicar = req.body.fechaAPublicar;
        const reaccionId = req.body.reaccionId;

        const menuOpciones = new MenuOpcionesFecha();
        menuOpciones.menuId = menuId
        menuOpciones.fechaAPublicar = fechaAPublicar
        menuOpciones.reaccion = reaccionId
        await manager.save(menuOpciones)

        res.status(201).json({
            message: 'Se creo la opcion del menu exitosamente.',
            post: { menuId: menuId, fechaAPublicar: fechaAPublicar, reaccion: reaccionId }
        });
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

export const findOpcionesPorFecha = async (fecha) => {
    const opciones = await AppDataSource.manager.findBy(MenuOpcionesFecha, fecha)
    return opciones
};
