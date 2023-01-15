import { AppDataSource } from "../data-source"
import { Empleado } from "../entity/Empleado"
import { getUsuario } from "../slack/apiSlack"

const manager = AppDataSource.manager

export const findOrCreateUsuario = async (idSlack) => {
    let usuarioSlack = await getUsuario(idSlack);
    if(usuarioSlack !== 500){
        let empleadoEncontrado;
        empleadoEncontrado = await findEmpleado(idSlack);
        if (empleadoEncontrado !== null){
            return empleadoEncontrado.id
        }
        else{
            return await createEmpleado(usuarioSlack, idSlack)
        }
    }
    else{
        return 500;
    }
}
export const getIdSlackEmpleadoById = async (id) => {
    try{
        const empleado = await manager.findOneBy(Empleado, {id: id})
        return empleado.idSlack;
    }
    catch(error){
        console.log(error);
        return 500;
    }
}

const findEmpleado = async (idSlack) => {
    try{
        const empleado = await manager.findOneBy(Empleado, {idSlack: idSlack})
        return empleado;
    }
    catch(error){
        console.log(error);
        return 500;
    }
}

export const createEmpleado = async (usuarioSlack, idSlack) => {
    try {
        usuarioSlack = JSON.parse(usuarioSlack)
        const empleado = new Empleado();
        empleado.nombre = usuarioSlack.profile.real_name
        empleado.idSlack = idSlack
        await manager.save(empleado);
        return findEmpleado(idSlack);
    }
    catch (error) {
        console.log(error)
        return 500;
    }
};

export const getEmpleadoNombre = async (Id) => {
    try {
        const empleadoEncontrado = await manager.findOneBy(Empleado, {id: Id})
        return empleadoEncontrado.nombre
    }
    catch (error) {
        console.log("Error al intentar encontrar un empleado.")
    }
}

export const getEmpleados = async (req,res) => {
    try {
        const empleados = await manager.find(Empleado);
        return res.json(empleados);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
