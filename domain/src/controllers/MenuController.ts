import { AppDataSource } from "../data-source";
import { Menu } from '../entity/Menu';
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

export const createMenu = (req, res, next) => {

    const esVegetariano = req.body.esVegetariano;
    const descripcion = req.body.descripcion;

    console.log("createMenu")
    console.log(esVegetariano)
    console.log(descripcion)

    const menu = new Menu();
    menu.esVegetariano = esVegetariano
    menu.descripcion = descripcion
    AppDataSource.manager.save(menu)
    res.status(201).json({
        message: 'Post created successfully!',
        post: { esVegetariano: esVegetariano, descripcion: descripcion }
    });
};

export const getMenuNombre = (req, res) => {
    const idMenu = req.body.id;
    const menuEncontrado = AppDataSource.manager.findOneBy(Menu, {
    id: idMenu
    }).then(menuEncontrado => {
        res.status(200).json({
                menuEncontrado: menuEncontrado.descripcion
            });})
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        });
}


export const getMenus = (req, res, next) => {

    const menus = AppDataSource.manager.find(Menu)
        .then(menus => {
            res
                .status(200)
                .json({
                    message: 'Fetched posts successfully.',
                    menus: menus
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

export const getMenuById = (req, res, next) => {

    const idMenu = req.body.id;

    const menuEncontrado = AppDataSource.manager.findOneBy(Menu, {
        id: idMenu
    }).then(menuEncontrado => {
        res
            .status(200)
            .json({
                message: 'Fetched posts successfully.',
                menuEncontrado: menuEncontrado
            });
    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

    console.log(menuEncontrado);
};


export const updateMenu = (req, res, next) => {

    const idMenu = req.body.id;
    const esVeg = req.body.esVegetariano;
    const desc = req.body.descripcion;

    const menuEncontrado = AppDataSource.manager.findOneBy(Menu, {
        id: idMenu
    }).then(menuEncontrado => {
        if (!menuEncontrado) {
            const error = new Error('Could not find menu.');
            throw error;
        }

        menuEncontrado.esVegetariano = esVeg;
        menuEncontrado.descripcion = desc;

        AppDataSource.manager.save(menuEncontrado);
    })
        .then(result => {
            res.status(200).json({ message: 'Menu updated!', menuEncontrado: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

export const deleteMenu = (req, res, next) => {

    const idMenu = req.body.id;

    const menuEncontrado = AppDataSource.manager.findOneBy(Menu, {
        id: idMenu
    }).then(menuEncontrado => {
        if (!menuEncontrado) {
            const error = new Error('Could not find menu.');
            throw error;
        }
        AppDataSource.manager.remove(menuEncontrado);
    })
        .then(result => {
            res.status(200).json({ message: 'Menu removed!'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

//PRECARGA
export const precarga =async()=>{
    precargaMenus();
}

export const precargaMenus = async ()=>{
    insertMenuManager(" Bondiola confitada a la cerveza acompañada por puré mixto con parmesano y ciboulette.",false);
    //insertMenuManager(" Bondiola confitada a la cerveza acompañada por puré mixto con parmesano y ciboulette.",true);
    insertMenuManager(" Bondiola confitada a la cerveza acompañada por ensalada de tomate, albahaca, zanahoria y queso crema.",false);
   // insertMenuManager(" Bondiola confitada a la cerveza acompañada por ensalada de tomate, albahaca, zanahoria y queso crema.",true);
    insertMenuManager(" Tortilla de papa con criollita acompañada por ensalada de tomate, albahaca, zanahoria y queso crema.",false); 
   // insertMenuManager(" Tortilla de papa con criollita acompañada por ensalada de tomate, albahaca, zanahoria y queso crema.",true); 
    insertMenuManager(" Tortilla de papa con criollita acompañada por puré mixto con parmesano y ciboulette.",false); 
   // insertMenuManager(" Tortilla de papa con criollita acompañada por puré mixto con parmesano y ciboulette.",true); 
    insertMenuManager(" Ensalada de la semana: Tomates cherry, champiñones a la provenzal, rúcula, zanahoria, pollo, lascas de parmesano, nuez y huevo duro.",true); 
   // insertMenuManager(" Ensalada de la semana: Tomates cherry, champiñones a la provenzal, rúcula, zanahoria, pollo, lascas de parmesano, nuez y huevo duro.",true); 
}

export const insertMenuManager = async (descrip,esVeget) => {
    console.log("Se procede a insertar un menu.")
    const menu = new Menu()
    menu.esVegetariano = esVeget;
    menu.descripcion = descrip;
    await AppDataSource.manager.save(menu)
    console.log("Se guardo el menú con el Id: " + menu.id)

    console.log("Cargando menus desde la base de datos...")
    const menus = await AppDataSource.manager.find(Menu)
    console.log("Los menus son: ", menus)
};