import { AppDataSource } from "../data-source"
import { Horario } from "../entity/Horario"
import { Pedido } from "../entity/Pedido"



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

        const pedidoEncontrado = await manager.findOneBy(Pedido, {
            horarioId: idHorario
        }).then(pedidoEncontrado => {
            if (pedidoEncontrado) {
                const error = new Error('Hay pedidos para este horario, no se puede modificar.');
                throw error;
            }

            try{
                const horarioEncontrado = manager.findOneBy(Horario, {
                    id: idHorario
                }).then(horarioEncontrado => {
                    if ((!horarioEncontrado) ||(horarioEncontrado && ((horarioEncontrado.hora).toString() === hora.toString()))) {
                        const error2 = new Error('No se encontro el horario.');
                        throw error2;
                    }
        
                    horarioEncontrado.hora = hora;
                    AppDataSource.manager.save(horarioEncontrado);
                }) 
                .then(result => {
                    res.status(200).json({ message: 'Horario actualizado correctamente.', horarioEncontrado: result });
                })
            }catch (error2) {
                return res.status(500).json({ message: error2.message })
            }
        })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const deleteHorario = async (req, res, next) => {
    try {
        const idHorario = req.body.id;

        const pedidoEncontrado = await manager.findOneBy(Pedido, {
            horarioId: idHorario
        }).then(pedidoEncontrado => {
            if (pedidoEncontrado) {
                const error = new Error('Hay pedidos para este horario, no se puede eliminar.');
                throw error;
            }

            try{
                const horarioEncontrado = manager.findOneBy(Horario, {
                    id: idHorario
                }).then(horarioEncontrado => {
                    if (!horarioEncontrado) {
                        const error2 = new Error('No se encontro el horario.');
                        throw error2;
                    }
                    AppDataSource.manager.remove(horarioEncontrado);
                }).then(result => {
                    res.status(200).json({ message: 'Horario eliminado!' });
                })
            }    catch (error2) {
                return res.status(500).json({ message: error2.message })
            }
        })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};
