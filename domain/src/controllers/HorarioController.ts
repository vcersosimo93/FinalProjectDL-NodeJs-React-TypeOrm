import { AppDataSource } from "../data-source"
import { Horario } from "../entity/Horario"

const manager = AppDataSource.manager

/*export const getHoras = async () => {
    const horarios = await AppDataSource.manager.find(Horario);
    console.log(horarios);
}*/

export const getHoras = async (req, res) => {
    try{
    const horarios = await AppDataSource.manager.find(Horario);
    //const horarios = await Horario.find()
    return res.json(horarios);
    //res.send(horarios);
    }
    catch (error){
        return res.status(500).json({message: error.message})
    }
}



export const getHorarios = async (req, res, next) => {
    res.status(200).json({
      //horarios : await AppDataSource.manager.find(Horario)
        horarios: [{ title: 'First Post', content: 'This is the first post!' ,}]
    });
  };
