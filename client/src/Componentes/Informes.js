import React from 'react';
import LogoInicio from '../Images/LogoInicio.jpg';
import { NavLink } from 'react-router-dom';
import Volver_img from '../Images/Volver.png';
import { useState } from 'react';
import { useEffect } from 'react';

let feedbacks = [
    { id: 1, empleadoId: "2", empleadoNombre: "Nico", comentario: "Le falto Sal a la ensalada.", fecha: "02/11/2022" },
    { id: 2, empleadoId: "1", empleadoNombre: "Noe", comentario: "Muy rica la tortilla.", fecha: "03/11/2022" },
    { id: 3, empleadoId: "3", empleadoNombre: "Vice", comentario: "Estaba quemada la pizza.", fecha: "01/11/2022" },
]

const Informes = () => {

    const [pedidosTodos, setPedidosTodos] = useState([{}]);
    const [horariosTodos, setHorariosTodos] = useState([{}]);
    const [menuesTodos, setmenuesTodos] = useState([{}]);
    const [empleadosTodos, setempleadosTodos] = useState([{}]);
    const [feedbackTodos, setfeedbackTodos] = useState([{}]);

    useEffect(() => {
        fetch('http://localhost:8080/pedido/get').then(
            response => response.json()
        ).then(
            data => {
                setPedidosTodos(data)
            }
        )
    }, [pedidosTodos])

    useEffect(() => {
        fetch('http://localhost:8080/horario/get').then(
            response => response.json())
            .then(
                data => {
                    setHorariosTodos(data);
                }
            )
    }, [horariosTodos])

    useEffect(() => {
        fetch('http://localhost:8080/menu/getAll').then(
            response => response.json())
            .then(
                data => {
                    setmenuesTodos(data.menus);
                }
            )
    }, [menuesTodos])

    useEffect(() => {
        fetch('http://localhost:8080/empleado/getAll').then(
            response => response.json())
            .then(
                data => {
                    setempleadosTodos(data);
                }
            )
    }, [empleadosTodos])

    useEffect(() => {
        fetch('http://localhost:8080/feedback/getAll').then(
            response => response.json())
            .then(
                data => {
                    setfeedbackTodos(data);
                }
            )
    }, [feedbackTodos])

    const findHorarioPorId = (IdHorario) => {
        for (let unHorario of horariosTodos) {
            if (unHorario.id == IdHorario) {
                console.log(unHorario)
                return unHorario.hora;
            }
        }
    }

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }

    const menuEsVegetariano = (IdMenu) => {
        let menuEncontrado;
        for (let unMenu of menuesTodos) {
            if (unMenu.id == IdMenu) {
                menuEncontrado = unMenu;
            }
        }
        if (menuEncontrado != null && menuEncontrado.esVegetariano) {
            return "Si"
        }
        else {
            return "No"
        }
    }

    const pedidosPorEmpleadoYMenu = (emplId, menId) => {
        let pedidosPorEmpleadoPorMenu = 0;
        for (let unPedido of pedidosTodos) {
            if (unPedido.empleadoId == emplId && unPedido.menuId == menId) {
                pedidosPorEmpleadoPorMenu++;
            }
        }
        return pedidosPorEmpleadoPorMenu;
    }

    const cantidadPedidosPorMenu = (idMenu) => {
        let contadorPedidos = 0;
        for (let unPedido of pedidosTodos) {
            if (unPedido.menuId == idMenu) {
                contadorPedidos++;
            }
        }
        return contadorPedidos;
    }

    const nombreEmpleadoPorId = (idEmpleado) => {
        for (let unEmpleado of empleadosTodos) {
            if (unEmpleado.id == idEmpleado) {
                return unEmpleado.nombre;
            }
        }
    }

    return (
        <div className="container m-2">
            <div className="row heading" >
                <div className="col d-flex">
                    <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
                </div>
                <div class="col d-flex flex-row-reverse" style={{ "paddingTop": "2%" }}>
                    <NavLink exact to="/Inicio" id="dash" >
                        <table className="linkContainerSecondOption" >
                            <img src={Volver_img} className="iconosImgSecondOption" />
                        </table>
                    </NavLink>
                </div>
                <h2 className="col-md-12 d-flex justify-content-center textosMenuInicial">Informes</h2>
                <div className="row textosMenuInicial">
                    <div className=" card col d-flex justify-content-center">
                        <h3 className=" justify-content-center tituloInforme">Platos elaborados por horario por día</h3>
                        <label className="divContenido">Fecha Elaboración</label>
                        <input placeholder="Seleccionar fecha" type="date" className="form-control" id="fechaId" name="fecha"></input><br></br>
                        <label className="divContenido">Horario de Almuerzo</label>
                        <select className="form-select divContenido" aria-label="Default select example" id="horario" name="hora">
                            <option value>Seleccione Horario</option>
                            {horariosTodos.map(h => <option key={h.id} value={h.id}>{h.hora}</option>)}
                        </select><br></br>
                        <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
                        <table className="table table-striped table-dark table-hover borderTable">
                            <thead className="thead-ligth">
                                <tr>
                                    <th scope="col">Menu</th>
                                    <th scope="col">Empleado</th>
                                    <th scope="col">Horario</th>
                                    <th scope="col">Dia De Almuerzo</th>
                                    <th scope="col">Es vegetariano</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidosTodos.map(p => <tr key={p.id}><td key={p.id + "nombre"}>{p.menuNombre}</td><td key={p.id + "nombreEmpleado"}>{p.empleadoNombre}</td><td key={p.id + "horario"}>{findHorarioPorId(p.horarioId)}</td><td key={p.id + "dia"}>{formatDate(p.fechaSolicitud)}</td><td key={p.id + "esVeg"}>{menuEsVegetariano(p.menuId)}</td></tr>)}
                            </tbody>
                        </table>
                        <h3 className="divContenido">Cantidad</h3>
                        <p className="divTexto">La cantidad de platos elaborados en el filtro establecido es de {pedidosTodos.length}.</p>
                    </div>
                </div>

                <div className="row textosMenuInicial">
                    <div className="card col d-flex justify-content-center">
                        <h3 className="col d-flex justify-content-center tituloInforme">Asistencia de personas por mes</h3>
                        <label className="divContenido">Mes</label>
                        <input type="month" id="month" name="week" className="form-control"></input><br></br>
                        <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>

                        {menuesTodos.map(mn =>
                            <div className="card col d-flex justify-content-center" id={mn.id}>
                                <h3 className="divContenido">{mn.descripcion}</h3>
                                <table className="table table-striped table-dark table-hover borderTable">
                                    <thead className="thead-ligth">
                                        <tr>
                                            <th scope="col">Nombre Empleado</th>
                                            <th scope="col">Cantidad de Pedidos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {empleadosTodos.map(e => <tr key={e.id}><td key={e.id + "nombre"}>{e.nombre}</td><td key={e.id + "cantidad"}>{pedidosPorEmpleadoYMenu(e.id, mn.id)}</td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <h3 className="divContenido">Otros</h3>
                        <p className="divTexto">No se registraron pedidos del resto de los menús en el mes seleccionado.</p>

                    </div>

                </div>
                <div className="row textosMenuInicial">
                    <div className="card col d-flex justify-content-center">
                        <h3 className="col d-flex justify-content-center tituloInforme">Platos más pedidos del mes</h3>
                        <label className="divContenido">Mes</label>
                        <input type="month" id="month" name="week" className="form-control"></input><br></br>
                        <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
                        <table className="table table-striped table-dark table-hover borderTable">
                            <thead className="thead-ligth">
                                <tr>
                                    <th scope="col">Menu</th>
                                    <th scope="col">Cantidad de Solicitudes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuesTodos.map(m => <tr key={m.id}><td key={m.id + "nombre"}>{m.descripcion}</td><td key={m.id + "cantidad"}>{cantidadPedidosPorMenu(m.id)}</td></tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className="card col d-flex justify-content-center">
                        <h3 className="col d-flex justify-content-center tituloInforme">Cantidad de platos elaborados por semana</h3>
                        <label className="divContenido">Semana</label>
                        <input type="week" id="week" name="week" className="form-control"></input><br></br>
                        <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
                        <table className="table table-striped table-dark table-hover borderTable">
                            <thead className="thead-ligth">
                                <tr>
                                    <th scope="col">Menu</th>
                                    <th scope="col">Cantidad de Solicitudes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuesTodos.map(m => <tr key={m.id}><td key={m.id + "nombre"}>{m.descripcion}</td><td key={m.id + "cantidad"}>{cantidadPedidosPorMenu(m.id)}</td></tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row textosMenuInicial">
                    <div className="card col d-flex justify-content-center">
                        <h3 className="col d-flex justify-content-center tituloInforme">Tabla de Feedbacks</h3>
                        <label className="divContenido">Fecha Desde</label>
                        <input placeholder="Seleccionar fecha" type="date" className="form-control" id="horario"></input>
                        <label className="divContenido">Fecha Hasta</label>
                        <input placeholder="Seleccionar fecha" type="date" className="form-control" id="horario"></input><br></br>
                        <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
                        <table className="table table-striped table-dark table-hover borderTable">
                            <thead className="thead-ligth">
                                <tr>
                                    <th scope="col">Empleado</th>
                                    <th scope="col">Comentario</th>
                                    <th scope="col">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbackTodos.map(f => <tr key={f.id}><td key={f.id + "nombre"}>{nombreEmpleadoPorId(f.empleadoId)}</td><td key={f.id + "comentario"}>{f.comentario}</td><td key={f.id + "fecha"}>{f.fecha}</td></tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <br></br><br></br><br></br><br></br>
            </div>
        </div>
    )
}

export default Informes