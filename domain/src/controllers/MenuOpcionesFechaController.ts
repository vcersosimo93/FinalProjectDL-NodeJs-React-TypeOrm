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

        res.status(201).json({
            message: 'Post created successfully!'
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

export const findOpcionesDelDia = async () => {
    let fecha = new Date()
    fecha.setHours(0, 0, 0, 0)
    const repoMO = AppDataSource.getRepository(MenuOpcionesFecha)
    const opciones = await repoMO.findBy({fechaAPublicar : fecha})
    return opciones
};
