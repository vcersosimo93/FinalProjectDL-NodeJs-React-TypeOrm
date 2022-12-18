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

