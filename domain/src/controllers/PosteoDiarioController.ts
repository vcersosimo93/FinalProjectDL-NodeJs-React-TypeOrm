import { AppDataSource } from "../data-source"
import { PosteoDiario } from "../entity/PosteoDiario"

const manager = AppDataSource.manager

export const createPosteo = async (posteo) => {
    try {
        const Ps = new PosteoDiario();
        Ps.posteo = posteo
        await manager.save(Ps);
        return 201;
    }
    catch (error){
        console.log(error);
        return 500;
    }
};

export const ultimoPosteo = async () => {
    try {
        const repoPD = manager.getRepository(PosteoDiario)
        return await repoPD.findOne({where: {},order: { id: 'DESC' }});
    }
    catch{
        return 500;
    }
};