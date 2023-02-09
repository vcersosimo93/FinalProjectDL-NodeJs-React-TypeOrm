import { AppDataSource } from "../data-source";
import { Menu } from '../entity/Menu';
import { MenuOpcionesFecha } from '../entity/MenuOpcionesFecha';
import { Pedido } from "../entity/Pedido"
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const manager = AppDataSource.manager

export const getMenuIdByNombre = async (nombre) => {
    try {
        const m = await manager.findOneBy(Menu, { descripcion: nombre })
        return m.id;
    }
    catch (error) {
        console.log(error);
        return 500;
    }
}

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
        return res.status(200).json({
            menus: menus
        });
    }
    catch (error) {
        return res.status(500)
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

        const opcionMenuEncontrada = await manager.findOneBy(MenuOpcionesFecha, {
            menuId: idMenu
        }).then(async (opcionMenuEncontrada) => {
            console.log(opcionMenuEncontrada)
            if (opcionMenuEncontrada) {
                const error3 = new Error('Ya hay opciones menu fecha del menu a actualizar. No se puede actualizar.');
                throw error3;
            }

            try {
                const pedidoEncontrado = await manager.findOneBy(Pedido, {
                    menuId: idMenu
                }).then(async (pedidoEncontrado) => {
                    console.log(pedidoEncontrado)
                    if (pedidoEncontrado) {
                        const error2 = new Error('Hay pedidos para este menu. No se puede actualizar.');
                        throw error2;
                    }

                    try {
                        const menuEncontrado = await manager.findOneBy(Menu, {
                            id: idMenu
                        }).then((menuEncontrado) => {
                            console.log(menuEncontrado)
                            if (!menuEncontrado) {
                                const error1 = new Error('No se encuentra el menu. No se puede actualizar.');
                                throw error1;
                            }
                            menuEncontrado.esVegetariano = esVeg;
                            menuEncontrado.descripcion = desc;
                            manager.save(menuEncontrado);
                        })
                        .then(result => {
                            res.status(200).json({ message: 'Menu actualizado.', menuEncontrado: result });
                        })
                    } catch (error1) {
                        return res.status(500).json({ message: error1.message })
                    }
                })
            } catch (error2) {
                return res.status(500).json({ message: error2.message })
            }
        })
    }
    catch (error3) {
        return res.status(500).json({ message: error3.message })
    }
};

export const deleteMenu = async (req, res, next) => {

    try {
        const idMenu = req.body.id;

        const opcionMenuEncontrada = await manager.findOneBy(MenuOpcionesFecha, {
            menuId: idMenu
        }).then(async (opcionMenuEncontrada) => {
            console.log(opcionMenuEncontrada)
            if (opcionMenuEncontrada) {
                const error3 = new Error('Ya hay opciones menu fecha del menu a eliminar. No se puede eliminar.');
                throw error3;
            }

            try {
                const pedidoEncontrado = await manager.findOneBy(Pedido, {
                    menuId: idMenu
                }).then(async pedidoEncontrado => {
                    console.log(pedidoEncontrado)
                    if (pedidoEncontrado) {
                        const error2 = new Error('Hay pedidos para este menu. No se puede eliminar.');
                        throw error2;
                    }

                    try {
                        const menuEncontrado = await manager.findOneBy(Menu, {
                            id: idMenu
                        }).then(menuEncontrado => {
                            if (!menuEncontrado) {
                                const error1 = new Error('No se encontró el menú. No se puede eliminar.');
                                throw error1;
                            }
                            manager.remove(menuEncontrado);
                        })
                        .then(result => {
                            res.status(200).json({ message: 'Menu eliminado.' });
                        })
                    } catch (error1) {
                        return res.status(500).json({ message: error1.message })
                    }
                })
            } catch (error2) {
                return res.status(500).json({ message: error2.message })
            }
        })
    }
    catch (error3) {
        return res.status(500).json({ message: error3.message })
    }
};

export const getEsVegetariano = async (Id) => {
    try {
        const menuEncontrado = await manager.findOneBy(Menu, { id: Id })
        return menuEncontrado.esVegetariano
    }
    catch (error) {
        console.log("Error al intentar encontrar un menu.")
    }
}

export const getMenuNombre = async (Id) => {
    try {
        const menuEncontrado = await manager.findOneBy(Menu, { id: Id })
        return menuEncontrado.descripcion
    }
    catch (error) {
        console.log("Error al intentar encontrar un menu.")
    }
}



