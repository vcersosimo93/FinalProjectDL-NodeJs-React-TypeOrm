import { AppDataSource } from "../data-source"
import { Horario } from "../entity/Horario"

const manager = AppDataSource.manager

export const getHorarios = async (req, res) => {
    try{
    const horarios = await AppDataSource.manager.find(Horario);
    return res.json(horarios);
    }
    catch (error){
        return res.status(500).json({message: error.message})
    }
}


export const createHorario = async (req, res, next) => {

    const hora = req.body.hora;
    const limitePersonas = req.body.limitePersonas;

    try{
        const horario = new Horario();
        horario.hora = hora
        horario.limitePersonas = limitePersonas
        await AppDataSource.manager.save(horario)
        res.status(201).json({
            message: 'Horario creado exitosamente.',
            post: { hora: hora, limitePersonas: limitePersonas }
        });
    }
    catch (error){
        return res.status(500).json({message: error.message})
    }
};


export const updateHorario = (req, res, next) => {

    const idHorario = req.body.id;
    const hora = req.body.hora;
    const lim = req.body.limitePersonas;

    const horarioEncontrado = AppDataSource.manager.findOneBy(Horario, {
        id: idHorario
    }).then(horarioEncontrado => {
        if (!horarioEncontrado) {
            const error = new Error('Could not find menu.');
            throw error;
        }

        horarioEncontrado.hora = hora;
        horarioEncontrado.limitePersonas = lim;

        AppDataSource.manager.save(horarioEncontrado);
    })
        .then(result => {
            res.status(200).json({ message: 'Horario actualizado!', horarioEncontrado: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

export const deleteHorario= (req, res, next) => {

    const idHorario = req.body.id;

    const horarioEncontrado = AppDataSource.manager.findOneBy(Horario, {
        id: idHorario
    }).then(horarioEncontrado => {
        if (!horarioEncontrado) {
            const error = new Error('No se encontro el horario.');
            throw error;
        }
        AppDataSource.manager.remove(horarioEncontrado);
    })
        .then(result => {
            res.status(200).json({ message: 'Horario eliminado!'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


export const insertHorario = async (hra,limPers) => {
    console.log("Se procede a insertar un horario.")
    const horario = new Horario()
    horario.hora = hra;
    horario.limitePersonas = limPers;
    await AppDataSource.manager.save(horario)
    console.log("Se guardo el menú con el Id: " + horario.id)

    console.log("Cargando horarios desde la base de datos...")
    const horarios = await AppDataSource.manager.find(Horario)
    console.log("Los horarios son: ", horarios)
};

export const precargaHorarios = async ()=>{
   insertHorario('12:30',30);
   insertHorario('12:45',30);
   insertHorario('13:00',30);
   insertHorario('13:15',30);
   insertHorario('13:30',30);
   insertHorario('13:45',30);
   insertHorario('14:00',30);
}