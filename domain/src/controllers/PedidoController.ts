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

//----------------------------------------------------------------------------------------------
//PRECARGA 
//----------------------------------------------------------------------------------------------

export const precargaPedidos = async () => {
    insertPedidoManager(4, 1,"2022-12-31",false,"Tortilla de papa con criollita acompañada por puré mixto con parmesano y ciboulette.",1);
    insertPedidoManager(1, 1,"2022-12-31",false,"Bondiola confitada a la cerveza acompañada por puré mixto con parmesano y ciboulette.",2);
    insertPedidoManager(2, 1,"2022-12-31",false,"Bondiola confitada a la cerveza acompañada por ensalada de tomate, albahaca, zanahoria y queso crema.",3);
    insertPedidoManager(3, 2,"2022-12-31",false,"Tortilla de papa con criollita acompañada por ensalada de tomate, albahaca, zanahoria y queso crema.",4);
    insertPedidoManager(3, 2,"2022-12-31",false,"Tortilla de papa con criollita acompañada por ensalada de tomate, albahaca, zanahoria y queso crema.",5);
    insertPedidoManager(1, 2,"2023-01-01",false,"Bondiola confitada a la cerveza acompañada por puré mixto con parmesano y ciboulette.",3);
    insertPedidoManager(1, 2,"2023-01-01",false,"Bondiola confitada a la cerveza acompañada por puré mixto con parmesano y ciboulette.",2);
    insertPedidoManager(2, 2,"2023-01-01",false,"Bondiola confitada a la cerveza acompañada por ensalada de tomate, albahaca, zanahoria y queso crema.",1);
    insertPedidoManager(3, 3,"2023-01-01",false,"Tortilla de papa con criollita acompañada por ensalada de tomate, albahaca, zanahoria y queso crema.",4);
    insertPedidoManager(4, 3,"2023-01-01",false,"Tortilla de papa con criollita acompañada por puré mixto con parmesano y ciboulette.",5);
    console.log("Se insertó correctamente la precarga de pedidos.")
}

export const insertPedidoManager = async (idMenu, idHorario,fecha,procesado,menuNombre,empleadoId) => {
    const pedido = new Pedido()
    pedido.menuId = idMenu;
    pedido.horarioId = idHorario;
    pedido.fechaSolicitud = fecha;
    pedido.estaProcesado = procesado;
    pedido.menuNombre = menuNombre;
    pedido.empleado = empleadoId;
    await AppDataSource.manager.save(pedido)
};

