import { AppDataSource } from "../data-source"
import { Pedido } from "../entity/Pedido"

const manager = AppDataSource.manager

export const getPedidosDelDia = async (req, res) => {
    try {let fecha = new Date()
    fecha.setHours(0, 0, 0, 0)
    const repoP = AppDataSource.getRepository(Pedido)
    const pedidos = await repoP.findBy({fechaSolicitud : fecha})
    return res.json(pedidos);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const getPedidos = async (req, res) => {
    try {
        const pedidos = await manager.find(Pedido);
        return res.json(pedidos);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const insertPedido = async (req) => {
    try{const pedido = new Pedido()
        pedido.menuId = req.menu;
        pedido.horarioId = req.horario
        pedido.fechaSolicitud = req.fecha;
        pedido.empleadoId = req.user;
        await AppDataSource.manager.save(pedido)
        return 201;
    }
    catch(error){
        console.log(error);
        return 500;
    }
};

