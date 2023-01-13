import { AppDataSource } from "../data-source"
import { Pedido } from "../entity/Pedido"
import { usuarioExcedePedido } from "../slack/apiSlack"

const manager = AppDataSource.manager
const repoP = AppDataSource.getRepository(Pedido)

export const finalizarPedidos = async (req, res) => {
    try{
        await manager.createQueryBuilder()
        .update(Pedido)
        .set({procesado : true})
        .where("menuId =" + req.body.menuId + " and horarioId =" + req.body.horarioId)
        .execute()
        return 200;
    }
    catch(error)
    {
        throw new Error(error)
    }
};


export const getPedidosDelDia = async (req, res) => {
    try {let fecha = new Date()
    fecha.setHours(0, 0, 0, 0)
    const pedidos = await repoP.findBy({fechaSolicitud : fecha, procesado : false})
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
        pedido.procesado = false;
        await AppDataSource.manager.save(pedido)
        let pedidosHechos = await countPedidosByHorarioAndFecha(req.horario.id, req.fecha)
        let cantidadPedidosXHorario = process.env.LIMITE_HORARIOS
        if (cantidadPedidosXHorario != undefined && pedidosHechos > parseInt(cantidadPedidosXHorario))
        {
           await usuarioExcedePedido(req.user);
        }
        return 201;
    }
    catch(error){
        console.log(error);
        return 500;
    }
}

const countPedidosByHorarioAndFecha = async (horario, fecha) => {
    try{
        let pedidos = await manager.find(Pedido)
        let contador = 0
        for (let i = 0; i < pedidos.length ; i++){
            if ((pedidos[i].horarioId == horario) && (pedidos[i].fechaSolicitud.getTime() == fecha.getTime())){
                contador += 1;
            }
        }
        return contador;
    }
    catch(error)
    {
        throw new Error(error)
    }
}
