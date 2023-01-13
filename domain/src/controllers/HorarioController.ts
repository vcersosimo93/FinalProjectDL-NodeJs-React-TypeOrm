import { AppDataSource } from "../data-source"
import { Horario } from "../entity/Horario"


const manager = AppDataSource.manager
const repoH = manager.getRepository(Horario)

export const getHorarioByHora = async (hora) => {
    try {
        return await repoH.findOne({where: {hora : hora}});
    }
    catch (error) {
        throw new Error(error);
    }
}

export const getHorariosOrdenados = async () => {
    try {
        return await repoH.find({where: {},order: { hora : 'ASC' }});
    }
    catch (error) {
        throw new Error(error);
    }
}


export const getHorarios = async (req,res) => {
    try {
        const horarios = await manager.find(Horario);
        return res.json(horarios);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getHorariosBase = async () => {
    try {
        const horarios = await manager.find(Horario);
        return horarios;
    }
    catch (error) {
        throw new Error(error)
    }
}

export const createHorario = async (req, res, next) => {
    try {
        const hora = req.body.hora;
        const reaccionHorario = req.body.reaccionHorario;
        const horario = new Horario();
        horario.hora = hora
        await manager.save(horario)
        res.status(201).json({
            message: 'Horario creado exitosamente.',
            post: { hora: hora, reaccionHorario: reaccionHorario}
        })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};


export const updateHorario = async(req, res, next) => {
    try {
        const idHorario = req.body.id;
        const hora = req.body.hora;

        const horarioEncontrado = await manager.findOneBy(Horario, {
            id: idHorario
        }).then(horarioEncontrado => {
            if (!horarioEncontrado) {
                const error = new Error('No se encontro el horario.');
                throw error;
            }

            horarioEncontrado.hora = hora;
            AppDataSource.manager.save(horarioEncontrado);
        }).then(result => {
            res.status(200).json({ message: 'Horario actualizado correctamente.', horarioEncontrado: result });
        })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const deleteHorario = async (req, res, next) => {
    try {
        const idHorario = req.body.id;
        const horarioEncontrado = await manager.findOneBy(Horario, {
            id: idHorario
        }).then(horarioEncontrado => {
            if (!horarioEncontrado) {
                const error = new Error('No se encontro el horario.');
                throw error;
            }
            AppDataSource.manager.remove(horarioEncontrado);
        }).then(result => {
            res.status(200).json({ message: 'Horario eliminado!' });
        })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const precargaHorarios = async () => {
    await insertHorario('12:30');
    await insertHorario('12:45');
    await insertHorario('13:00');
    await insertHorario('13:15');
    await insertHorario('13:30');
    await insertHorario('13:45');
    await insertHorario('14:00');
    console.log("Se insertó correctamente la precarga de horarios.")
}

export const insertHorario = async (hra) => {
    const horario = new Horario()
    horario.hora = hra;
    await AppDataSource.manager.save(horario)
};

