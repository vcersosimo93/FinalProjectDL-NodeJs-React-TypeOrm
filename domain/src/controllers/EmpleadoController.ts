import { AppDataSource } from "../data-source"
import { Empleado } from "../entity/Empleado"

const manager = AppDataSource.manager

export const createEmpleado = async (req, res, next) => {
    const nombre = req.body.nombre;
    try {
        const empleado = new Empleado();
        empleado.nombre = nombre
        await manager.save(empleado)
        return res.status(201)
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const precargaEmpleados = async () => {
    insertEmpleadoManager("Nicolás Rodríguez.");
    insertEmpleadoManager("Vicente Cersosimo.");
    insertEmpleadoManager("Carlos Berutti.");
    insertEmpleadoManager("Mauro Cela.");
    insertEmpleadoManager("Gabriel Vidal.");
    insertEmpleadoManager("María Noel Novoa.");
    console.log("Se insertó correctamente la precarga de empleados.")
}

export const insertEmpleadoManager = async (nom) => {
    const empleado = new Empleado()
    empleado.nombre = nom;
    await manager.save(empleado)
};
