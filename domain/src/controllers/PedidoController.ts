import { AppDataSource } from "../data-source"
import { Pedido } from "../entity/Pedido"

const manager = AppDataSource.manager

export const getPedidos = async (req, res) => {
    try{
    const pedidos = await manager.find(Pedido);
    return res.json(pedidos);
    }
    catch (error){
        return res.status(500).json({message: error.message})
    }
}