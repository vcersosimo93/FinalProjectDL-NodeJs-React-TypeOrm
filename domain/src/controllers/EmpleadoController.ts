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

