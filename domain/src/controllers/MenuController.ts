//import { getRepository } from "typeorm";
import { AppDataSource } from "../data-source"
import { Menu } from "../entity/Menu"

//1). Funciona el Entity Manager.
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
}

/*
//2) No funciona. Deprecado el uso del Repository.
export const insertMenuRepository = async () =>{
    const userRepo =getRepository(Menu);
    const menu = userRepo.create({esVegetariano: true, descripcion: "Milanesa"});
   userRepo.save(menu).catch((err)=>{
        console.log("Error: ", err);
   })
   console.log("Menu Insertado Usando Repository con el siguiente id: ", menu);
}

*/