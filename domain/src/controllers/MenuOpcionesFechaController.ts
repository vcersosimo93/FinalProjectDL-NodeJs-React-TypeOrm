import { AppDataSource } from "../data-source";
import { MenuOpcionesFecha } from '../entity/MenuOpcionesFecha';
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const manager = AppDataSource.manager
const repoMO = AppDataSource.getRepository(MenuOpcionesFecha)

export const createMenuOpciones = async (req, res, next) => {
    try {
        const menuOpciones = new MenuOpcionesFecha();
        menuOpciones.menuId = req.body.menu;
        menuOpciones.fechaAPublicar = req.body.fechaAPublicar;
        menuOpciones.reaccion = req.body.reaccion;
        const menuOpcionesFechaEncontrado = await manager.findOneBy(MenuOpcionesFecha, {
            fechaAPublicar: menuOpciones.fechaAPublicar
        });

        if(menuOpcionesFechaEncontrado==null){
            await manager.save(menuOpciones)

            res.status(201).json({
                message: 'Post created successfully!'
            });
        }else{
            res.status(401).json();
        }
        
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const getMenusOpciones = async (req, res) => {
    try {
        const menusOpciones = await manager.find(MenuOpcionesFecha);
        return res.json(menusOpciones);
    }
    catch (error) {
        throw new Error (error);
    }
}

export const findOpcionesDelDia = async () => {
    let fecha = new Date()
    fecha.setHours(0, 0, 0, 0)
    const opciones = await repoMO.findBy({fechaAPublicar : fecha})
    return opciones;
};

export const deleteMO = async (req, res) => {
    try {
    
      const fecha = new Date(req.body.fecha);
      const MO = await repoMO.findOneBy({fechaAPublicar : fecha});
      console.log(MO);
      await manager.remove(MO);
      return 200;

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};