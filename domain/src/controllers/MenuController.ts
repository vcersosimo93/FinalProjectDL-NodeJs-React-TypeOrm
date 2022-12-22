import { AppDataSource } from "../data-source";
import { Menu } from '../entity/Menu';
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const manager = AppDataSource.manager

export const createMenu = async (req, res, next) => {

    const esVegetariano = req.body.esVegetariano;
    const descripcion = req.body.descripcion;

    try {
        const menu = new Menu();
        menu.esVegetariano = esVegetariano
        menu.descripcion = descripcion
        await manager.save(menu)
        res.status(201).json({
            message: 'Menu creado exitosamente.',
            post: { esVegetariano: esVegetariano, descripcion: descripcion }
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const getMenus = async (req, res) => {

    try {
        const menus = await manager.find(Menu);
        return res.json({
            message: 'Menu Obtenidos Exitosamente.',
            menus: menus
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getMenuById = async (req, res, next) => {

    try {
        const idMenu = req.body.id;
        const menuEncontrado = await manager.findOneBy(Menu, {
            id: idMenu
        });
        return res.json({
            message: 'Menu encontrado exitosamente.',
            menuEncontrado: menuEncontrado
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const updateMenu = async (req, res, next) => {

    try {
        const idMenu = req.body.id;
        const esVeg = req.body.esVegetariano;
        const desc = req.body.descripcion;

        const menuEncontrado = await manager.findOneBy(Menu, {
            id: idMenu
        }).then(menuEncontrado => {
            if (!menuEncontrado) {
                const error = new Error('No se encuentra el menu.');
                throw error;
            }
            menuEncontrado.esVegetariano = esVeg;
            menuEncontrado.descripcion = desc;
            manager.save(menuEncontrado);
        }).then(result => {
            res.status(200).json({ message: 'Menu actualizado.', menuEncontrado: result });
        })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const deleteMenu = (req, res, next) => {

    try {
        const idMenu = req.body.id;
        const menuEncontrado = manager.findOneBy(Menu, {
            id: idMenu
        }).then(menuEncontrado => {
            if (!menuEncontrado) {
                const error = new Error('No se encontró el menú.');
                throw error;
            }
            manager.remove(menuEncontrado);
        })
            .then(result => {
                res.status(200).json({ message: 'Menu removed!' });
            })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const getMenuNombre = async (req, res) => {
    try {
        const idMenu = req.body.id;
        const menuEncontrado = await manager.findOneBy(Menu, {
            id: idMenu
        })
            .then(menuEncontrado => {
                res.status(200).json({
                    menuEncontrado: menuEncontrado.descripcion
                });
            })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


//----------------------------------------------------------------------------------------------
//PRECARGA 
//----------------------------------------------------------------------------------------------

export const precarga = async () => {
    precargaMenus();
}

export const precargaMenus = async () => {
    insertMenuManager(" Bondiola confitada a la cerveza acompañada por puré mixto con parmesano y ciboulette.", false);
    insertMenuManager(" Bondiola confitada a la cerveza acompañada por ensalada de tomate, albahaca, zanahoria y queso crema.", false);
    insertMenuManager(" Tortilla de papa con criollita acompañada por ensalada de tomate, albahaca, zanahoria y queso crema.", false);
    insertMenuManager(" Tortilla de papa con criollita acompañada por puré mixto con parmesano y ciboulette.", false);
    insertMenuManager(" Ensalada de la semana: Tomates cherry, champiñones a la provenzal, rúcula, zanahoria, pollo, lascas de parmesano, nuez y huevo duro.", true);
    console.log("Se insertó correctamente la precarga de menus.")
}

export const insertMenuManager = async (descrip, esVeget) => {
    const menu = new Menu()
    menu.esVegetariano = esVeget;
    menu.descripcion = descrip;
    await AppDataSource.manager.save(menu)
};


