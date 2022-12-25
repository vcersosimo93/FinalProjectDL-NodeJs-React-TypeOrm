import { AppDataSource } from "../data-source"
import { Pedido } from "../entity/Pedido"

const manager = AppDataSource.manager

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
        pedido.horarioId = Math.floor(Math.random() * (5 - 1 + 1) + 1); //CAMBIAR
        pedido.fechaSolicitud = req.fecha;
        pedido.estaProcesado = false;
        pedido.empleado = req.user;
        await AppDataSource.manager.save(pedido)
        return 201;
    }
    catch(error){
        console.log(error);
        return 500;
    }
};

