import { AppDataSource } from "../data-source"
import { Horario } from "../entity/Horario"


const manager = AppDataSource.manager

export const getHorarios = async (req, res) => {
    try {
        const horarios = await manager.find(Horario);
        return res.json(horarios);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createHorario = async (req, res, next) => {
    try {
        const hora = req.body.hora;
        const limitePersonas = req.body.limitePersonas;

        const horario = new Horario();
        horario.hora = hora
        horario.limitePersonas = limitePersonas
        await manager.save(horario)
        res.status(201).json({
            message: 'Horario creado exitosamente.',
            post: { hora: hora, limitePersonas: limitePersonas }
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};


export const updateHorario = async(req, res, next) => {
    try {
        const idHorario = req.body.id;
        const hora = req.body.hora;
        const lim = req.body.limitePersonas;

        const horarioEncontrado = await manager.findOneBy(Horario, {
            id: idHorario
        }).then(horarioEncontrado => {
            if (!horarioEncontrado) {
                const error = new Error('No se encontro el horario.');
                throw error;
            }

            horarioEncontrado.hora = hora;
            horarioEncontrado.limitePersonas = lim;
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



//----------------------------------------------------------------------------------------------
//PRECARGA 
//----------------------------------------------------------------------------------------------

export const precargaHorarios = async () => {
    insertHorario('12:30', 30);
    insertHorario('12:45', 30);
    insertHorario('13:00', 30);
    insertHorario('13:15', 30);
    insertHorario('13:30', 30);
    insertHorario('13:45', 30);
    insertHorario('14:00', 30);
    console.log("Se insertó correctamente la precarga de horarios.")
}

export const insertHorario = async (hra, limPers) => {
    const horario = new Horario()
    horario.hora = hra;
    horario.limitePersonas = limPers;
    await AppDataSource.manager.save(horario)
};