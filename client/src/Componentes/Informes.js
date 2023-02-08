import React from 'react';
import LogoInicio from '../Images/LogoInicio.jpg';
import { NavLink } from 'react-router-dom';
import Volver_img from '../Images/Volver.png';
import { useState } from 'react';
import { useEffect, useRef } from 'react';


let arrayPedidosFiltrado = [];
let arrayFeedbacksFiltrado = [];
let arrayEmpleadosFiltrado = [];
let arrayMenuesFiltradosPorMes = [];
let arrayMenuesFiltradosPorSemana = [];

const Informes = () => {

    const [pedidosTodos, setPedidosTodos] = useState([{}]);
    const [horariosTodos, setHorariosTodos] = useState([{}]);
    const [menuesTodos, setmenuesTodos] = useState([{}]);
    const [empleadosTodos, setempleadosTodos] = useState([{}]);
    const [feedbackTodos, setfeedbackTodos] = useState([{}]);

    const [pedidosFiltrado, setPedidosFiltrado] = useState([{}]);
    const fecha = useRef()
    const hora = useRef()

    const [feedbacksFiltrado, setFeedbacksFiltrado] = useState([{}]);
    const fechaDesde = useRef()
    const empleado = useRef()

    const [empleadosFiltrado, setEmpleadosFiltrado] = useState([{}]);
    const mes = useRef()

    const [menuesFiltradosPorMes, setmenuesFiltradosPorMes] = useState([{}]);
    const mesMenu = useRef()
    const [menuesFiltradosPorSemana, setmenuesFiltradosPorSemana] = useState([{}]);
    const semanaMenu = useRef()

    useEffect(() => {
        setPedidosFiltrado(arrayPedidosFiltrado)
    }, [pedidosFiltrado])

    useEffect(() => {
        setFeedbacksFiltrado(arrayFeedbacksFiltrado)
    }, [feedbacksFiltrado])

    useEffect(() => {
        setEmpleadosFiltrado(arrayEmpleadosFiltrado)
    }, [empleadosFiltrado])

    useEffect(() => {
        setmenuesFiltradosPorMes(arrayMenuesFiltradosPorMes)
    }, [menuesFiltradosPorMes])

    useEffect(() => {
        setmenuesFiltradosPorSemana(arrayMenuesFiltradosPorSemana)
    }, [menuesFiltradosPorSemana])

    useEffect(() => {
        fetch(process.env.REACT_APP_LOCALHOST + '/pedido/get').then(
            response => response.json()
        ).then(
            data => {
                setPedidosTodos(data)
            }
        )
    }, [pedidosTodos])

    useEffect(() => {
        fetch(process.env.REACT_APP_LOCALHOST + '/horario/get').then(
            response => response.json())
            .then(
                data => {
                    setHorariosTodos(data);
                }
            )
    }, [horariosTodos])

    useEffect(() => {
        fetch(process.env.REACT_APP_LOCALHOST +'/menu/getAll').then(
            response => response.json())
            .then(
                data => {
                    setmenuesTodos(data.menus);
                }
            )
    }, [menuesTodos])

    useEffect(() => {
        fetch(process.env.REACT_APP_LOCALHOST + '/empleado/getAll').then(
            response => response.json())
            .then(
                data => {
                    setempleadosTodos(data);
                }
            )
    }, [empleadosTodos])

    useEffect(() => {
        fetch(process.env.REACT_APP_LOCALHOST + '/feedback/getAll').then(
            response => response.json())
            .then(
                data => {
                    setfeedbackTodos(data);
                }
            )
    }, [feedbackTodos])

    const inicializarArrays =() =>{
        while (arrayPedidosFiltrado.length) {
            arrayPedidosFiltrado.pop();
        }
        while (arrayFeedbacksFiltrado.length) {
            arrayFeedbacksFiltrado.pop();
        }
        while (arrayEmpleadosFiltrado.length) {
            arrayEmpleadosFiltrado.pop();
        }
        while (arrayMenuesFiltradosPorMes.length) {
            arrayMenuesFiltradosPorMes.pop();
        }
        while (arrayMenuesFiltradosPorSemana.length) {
            arrayMenuesFiltradosPorSemana.pop();
        }
    }


    const findHorarioPorId = (IdHorario) => {
        for (let unHorario of horariosTodos) {
            if (unHorario.id === IdHorario) {
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

    const formatDateOther = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const formatDateToMonth = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;

        return [year, month].join('-');
    }

    const formatDateToWeek = (date) => {
        let d = new Date(date);
        let anio = d.getFullYear();
        let year = new Date(d.getFullYear(), 0, 1);
        let numberOfDays = Math.floor((d - year) / (24 * 60 * 60 * 1000));
        let week = (Math.ceil((d.getDay() + 1 + numberOfDays) / 7) - 1).toString();

        if (week.length < 2) {
            week = "0" + week;
        }
        let weekString = "W" + week;

        return [anio, weekString].join('-');
    }


    const menuEsVegetariano = (IdMenu) => {
        let menuEncontrado;
        for (let unMenu of menuesTodos) {
            if (unMenu.id === IdMenu) {
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

    const pedidosPorEmpleadoMenuYMes = (emplId, menId, mesSeleccionado) => {

        let pedidosPorEmpleadoPorMenu = 0;
        if (mesSeleccionado === "") {
            for (let unPedido of pedidosTodos) {
                if (unPedido.empleadoId === emplId && unPedido.menuId === menId) {
                    pedidosPorEmpleadoPorMenu++;
                }
            }
        }
        else {
            for (let unPedido of pedidosTodos) {
                if (unPedido.empleadoId === emplId && unPedido.menuId === menId && formatDateToMonth(unPedido.fechaSolicitud) === mesSeleccionado) {
                    pedidosPorEmpleadoPorMenu++;
                }
            }
        }

        return pedidosPorEmpleadoPorMenu;
    }

    const cantidadPedidosPorMenuPorMes = (idMenu, mesFiltrado) => {
        let contadorPedidos = 0;
        if (mesFiltrado === "") {
            for (let unPedido of pedidosTodos) {
                if (unPedido.menuId === idMenu) {
                    contadorPedidos++;
                }
            }
        }
        else {
            for (let unPedido of pedidosTodos) {
                if (unPedido.menuId === idMenu && formatDateToMonth(unPedido.fechaSolicitud) === mesFiltrado) {
                    contadorPedidos++;
                }
            }
        }

        return contadorPedidos;
    }

    const cantidadPedidosPorMenuPorSemana = (idMenu, semanaFiltrada) => {
        let contadorPedidos = 0;
        console.log(semanaFiltrada)
        if (semanaFiltrada === "") {
            for (let unPedido of pedidosTodos) {
                if (unPedido.menuId === idMenu) {
                    contadorPedidos++;
                }
            }
        }
        else {
            for (let unPedido of pedidosTodos) {
                console.log(formatDateToWeek(unPedido.fechaSolicitud))
                console.log(semanaFiltrada)
                if (unPedido.menuId === idMenu && formatDateToWeek(unPedido.fechaSolicitud) === semanaFiltrada) {
                    contadorPedidos++;
                }
            }
        }
        return contadorPedidos;
    }

    const nombreEmpleadoPorId = (idEmpleado) => {
        for (let unEmpleado of empleadosTodos) {
            if (unEmpleado.id === idEmpleado) {
                return unEmpleado.nombre;
            }
        }
    }

    const filtroInformePedidos = postData => {
        postData.preventDefault();
        const fechaSeleccionada = fecha.current.value
        const idhorarioSeleccionado = hora.current.value

        while (arrayPedidosFiltrado.length) {
            arrayPedidosFiltrado.pop();
        }

        if (fechaSeleccionada !== "" && (idhorarioSeleccionado !== "")) {
            for (let unPedido of pedidosTodos) {
                if (formatDateOther(unPedido.fechaSolicitud) === fechaSeleccionada && (unPedido.horarioId).toString() === idhorarioSeleccionado.toString()) {
                    arrayPedidosFiltrado.push(unPedido)
                }
            }
        }

        if (fechaSeleccionada === "" && (idhorarioSeleccionado === "")) {
            for (let unPedido of pedidosTodos) {
                arrayPedidosFiltrado.push(unPedido)
            }
        }

        if (fechaSeleccionada === "" && (idhorarioSeleccionado !== "")) {
            for (let unPedido of pedidosTodos) {
                if ((unPedido.horarioId).toString() === idhorarioSeleccionado.toString()) {
                    arrayPedidosFiltrado.push(unPedido)
                }
            }
        }

        if (fechaSeleccionada !== "" && (idhorarioSeleccionado === "")) {
            for (let unPedido of pedidosTodos) {
                if (formatDateOther(unPedido.fechaSolicitud) === fechaSeleccionada) {
                    arrayPedidosFiltrado.push(unPedido)
                }
            }
        }
    }

    const filtroInformeEmpleados = postData => {
        postData.preventDefault();
        const mesFiltro = mes.current.value
        console.log(mesFiltro)

        while (arrayEmpleadosFiltrado.length) {
            arrayEmpleadosFiltrado.pop();
        }

        for (let unEmpleado of empleadosTodos) {
            for (let unMenu of menuesTodos) {
                let unEmpleadoAAñadir = {
                    id: unEmpleado.id,
                    nombre: unEmpleado.nombre,
                    idMenu: unMenu.id,
                    cantidadPedidos: pedidosPorEmpleadoMenuYMes(unEmpleado.id, unMenu.id, mesFiltro)
                }

                if (unEmpleadoAAñadir.cantidadPedidos > 0) {
                    arrayEmpleadosFiltrado.push(unEmpleadoAAñadir)
                }

            }
        }

        console.log(arrayEmpleadosFiltrado)



    }

    const filtroMenuesPorMes = postData => {
        postData.preventDefault();
        const mesFiltro = mesMenu.current.value
        console.log(mesFiltro)

        while (arrayMenuesFiltradosPorMes.length) {
            arrayMenuesFiltradosPorMes.pop();
        }

        for (let unMenu of menuesTodos) {
            let menuFiltro = {
                id: unMenu.id,
                descripcion: unMenu.descripcion,
                cantidad: cantidadPedidosPorMenuPorMes(unMenu.id, mesFiltro)
            }

            if (menuFiltro.cantidad > 0) {
                arrayMenuesFiltradosPorMes.push(menuFiltro)
            }

        }

    }

    const filtroMenuesPorSemana = postData => {
        postData.preventDefault();
        const semanaFiltro = semanaMenu.current.value
        console.log(semanaFiltro)

        while (arrayMenuesFiltradosPorSemana.length) {
            arrayMenuesFiltradosPorSemana.pop();
        }

        for (let unMenu of menuesTodos) {
            let menuFiltro = {
                id: unMenu.id,
                descripcion: unMenu.descripcion,
                cantidad: cantidadPedidosPorMenuPorSemana(unMenu.id, semanaFiltro)
            }
            if (menuFiltro.cantidad > 0) {
                arrayMenuesFiltradosPorSemana.push(menuFiltro)
            }

        }
    }

    const filtroInformeFeedbacks = postData => {
        postData.preventDefault();
        const fechaDesdeSeleccionada = fechaDesde.current.value

        while (arrayFeedbacksFiltrado.length) {
            arrayFeedbacksFiltrado.pop();
        }

        if (fechaDesdeSeleccionada !== "") {
            for (let unFeedback of feedbackTodos) {
                if ((formatDateOther(unFeedback.fecha) > fechaDesdeSeleccionada || formatDateOther(unFeedback.fecha) === fechaDesdeSeleccionada)) {
                    arrayFeedbacksFiltrado.push(unFeedback)
                }
            }
        }

        if (fechaDesdeSeleccionada === "") {
            for (let unFeedback of feedbackTodos) {
                    arrayFeedbacksFiltrado.push(unFeedback)
            }
        }

        console.log(arrayFeedbacksFiltrado)
    }

    return (
        <div className="container m-2">
            <div className="row heading" >
                <div className="col d-flex">
                    <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
                </div>
                <div className="col d-flex flex-row-reverse" style={{ "paddingTop": "2%" }}>
                    <NavLink exact to="/Inicio" id="dash" >
                        <div className="linkContainerSecondOption" >
                            <img src={Volver_img} alt ="imagenVolver" className="iconosImgSecondOption" onClick={inicializarArrays}/>
                        </div>
                    </NavLink>
                </div>
                <h2 className="col-md-12 d-flex justify-content-center textosMenuInicial">Informes</h2>
                <p className="col-12 d-flex align-items-center pContenidoSinFondo">A continuación se muestra los informes disponibles para visualizar información acerca de los pedidos realizados en el sistema. Seleccione el informe que desee y el filtrado correspondiente.</p>
                <div className="list-group list-group">
                    <a href="#informeUno" className="list-group-item list-group-item-action list-group-item-primary">Platos elaborados por horario por día</a>
                    <a href="#informeDos" className="list-group-item list-group-item-action list-group-item-primary">Asistencia de personas por mes</a>
                    <a href="#informeTres" className="list-group-item list-group-item-action list-group-item-primary">Platos más pedidos del mes</a>
                    <a href="#informeCuatro" className="list-group-item list-group-item-action list-group-item-primary">Cantidad de platos elaborados por semana</a>
                    <a href="#informeCinco" className="list-group-item list-group-item-action list-group-item-primary">Tabla de Feedbacks</a>
                </div>
                <div className="row textosMenuInicial">
                    <div className=" card col d-flex justify-content-center" id="informeUno">
                        <h3 className=" justify-content-center tituloInforme">Platos elaborados por horario por día</h3>
                        <h1 className="divContenidoTextos">Filtrar por fecha y/o horario para mostrar información de los pedidos solicitados. Si no se elije ningun filtro, se mostrarán todos los pedidos realizados.</h1>
                        <label className="divContenido">Fecha Elaboración</label>
                        <input placeholder="Seleccionar fecha" type="date" className="form-control" id="fechaId" name="fecha" ref={fecha}></input><br></br>
                        <label className="divContenido">Horario de Almuerzo</label>
                        {horariosTodos.length > 0 &&
                            <select className="form-select divContenido selectblack" aria-label="Default select example" id="horario" name="hora" ref={hora}>
                                <option value="">Seleccione Horario</option>
                                {horariosTodos.map(h => <option key={h.id} value={h.id}>{h.hora}</option>)}
                            </select>
                        }
                        {horariosTodos.length <= 0 &&
                            <select className="form-select divContenido" aria-label="Default select example" id="horario" name="hora" ref={hora} hidden="hidden">
                                <option value="">Seleccione Horario</option>
                            </select>}
                        {horariosTodos.length <= 0 &&
                            <p className="col-9 d-flex align-items-center pContenido marcaAgua">No hay Horarios ingresados en el sistema para seleccionar. Debe ingresar previamente horarios para emitir el informe filtrado con esta condición.</p>
                        }
                        <br></br>
                        <button onClick={filtroInformePedidos} type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>

                        {pedidosFiltrado.length > 0 &&
                            <div className="divContenido">

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
                                        {pedidosFiltrado.map(p => <tr key={p.id}><td key={p.id + "nombre"}>{p.menuNombre}</td><td key={p.id + "nombreEmpleado"}>{p.empleadoNombre}</td><td key={p.id + "horario"}>{findHorarioPorId(p.horarioId)}</td><td key={p.id + "dia"}>{formatDate(p.fechaSolicitud)}</td><td key={p.id + "esVeg"}>{menuEsVegetariano(p.menuId)}</td></tr>)}
                                    </tbody>

                                </table>

                                <h3 className="divContenido">Cantidad</h3>
                                <p className="divTexto">La cantidad de platos elaborados en el filtro establecido es de {pedidosFiltrado.length}.</p>
                            </div>
                        }
                        {pedidosFiltrado.length <= 0 &&
                            <p className="col-9 d-flex align-items-center pContenido marcaAgua">No hay información para mostrar.</p>
                        }
                    </div>
                </div>

                <div className="row textosMenuInicial">
                    <div className="card col d-flex justify-content-center" id="informeDos">
                        <h3 className="col d-flex justify-content-center tituloInforme">Asistencia de personas por mes</h3>
                        <h1 className="divContenidoTextos">Filtrar por mes para ver la cantidad de pedidos solicitados por empleado en dicho mes agrupados por menu. Si no se elije ningun filtro, se mostrarán la cantidad de pedidos totales acumuladas por empleado agrupados por menu.</h1>
                        <label className="divContenido">Mes</label>
                        <input type="month" id="month" name="mes" className="form-control" ref={mes}></input><br></br>
                        <button onClick={filtroInformeEmpleados} type="button" className="btn btn-primary " data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
                        {menuesTodos.length > 0 && arrayEmpleadosFiltrado.length>0 &&
                            <div className="divContenido">
                                {menuesTodos.map(mn =>
                                    <div className="card col d-flex justify-content-center" id={mn.id}>
                                        {arrayEmpleadosFiltrado.filter(em => em.idMenu === mn.id).length > 0 &&
                                            <h3 className="divContenido">{mn.descripcion}</h3>
                                        }
                                        {arrayEmpleadosFiltrado.filter(em => em.idMenu === mn.id).length > 0 &&
                                            <table className="table table-striped table-dark table-hover borderTable">
                                                <thead className="thead-ligth">
                                                    <tr>
                                                        <th scope="col">Nombre Empleado</th>
                                                        <th scope="col">Cantidad de Pedidos</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(arrayEmpleadosFiltrado.filter(em => em.idMenu === mn.id)).map(e => <tr key={e.id}><td key={e.id + "nombre"}>{e.nombre}</td><td key={e.id + "cantidad"}> {e.cantidadPedidos}</td></tr>)}
                                                </tbody>
                                            </table>
                                        }
                                    </div>
                                )}
                            </div>
                        }
                        {(menuesTodos.length <= 0 || arrayEmpleadosFiltrado.length <= 0) && 
                            <p className="col-9 d-flex align-items-center pContenido marcaAgua">No hay información para mostrar.</p>
                        }
                    </div>

                </div>

                <div className="row textosMenuInicial">
                    <div className=" card col d-flex justify-content-center" id="informeTres">
                        <h3 className="col d-flex justify-content-center tituloInforme">Platos más pedidos del mes</h3>
                        <h1 className="divContenidoTextos">Filtrar por mes para ver la cantidad de pedidos por menu de dicho mes. Si no se elije ningun filtro, se mostrarán la cantidad acumulada de pedidos por menu.</h1>
                        <label className="divContenido">Mes</label>
                        <input type="month" id="month" name="mesFiltro" className="form-control" ref={mesMenu}></input><br></br>
                        <button onClick={filtroMenuesPorMes} type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
                        {menuesFiltradosPorMes.length > 0 &&
                            <table className="table table-striped table-dark table-hover borderTable">
                                <thead className="thead-ligth">
                                    <tr>
                                        <th scope="col">Menu</th>
                                        <th scope="col">Cantidad de Solicitudes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menuesFiltradosPorMes.map(m => <tr key={m.id}><td key={m.id + "nombre"}>{m.descripcion}</td><td key={m.id + "cantidad"}>{m.cantidad}</td></tr>)}
                                </tbody>
                            </table>
                        }
                        {menuesFiltradosPorMes.length <= 0 &&
                            <p className="col-9 d-flex align-items-center pContenido marcaAgua">No hay información para mostrar.</p>
                        }
                    </div>
                </div>
                <div className="row textosMenuInicial">
                    <div className=" card col d-flex justify-content-center" id="informeCuatro">
                        <h3 className="col d-flex justify-content-center tituloInforme">Cantidad de platos elaborados por semana</h3>
                        <h1 className="divContenidoTextos">Filtrar por semana para ver la cantidad de pedidos por menu de dicha semana. Si no se elije ningun filtro, se mostrarán la cantidad acumulada de pedidos por menu.</h1>
                        <label className="divContenido">Semana</label>
                        <input type="week" id="week" name="semanaMenu" className="form-control" ref={semanaMenu}></input><br></br>
                        <button onClick={filtroMenuesPorSemana} type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
                        {arrayMenuesFiltradosPorSemana.length > 0 &&
                            <table className="table table-striped table-dark table-hover borderTable">
                                <thead className="thead-ligth">
                                    <tr>
                                        <th scope="col">Menu</th>
                                        <th scope="col">Cantidad de Solicitudes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arrayMenuesFiltradosPorSemana.map(m => <tr key={m.id}><td key={m.id + "nombre"}>{m.descripcion}</td><td key={m.id + "cantidad"}>{m.cantidad}</td></tr>)}
                                </tbody>
                            </table>
                        }
                        {arrayMenuesFiltradosPorSemana.length <= 0 &&
                            <p className="col-9 d-flex align-items-center pContenido marcaAgua">No hay información para mostrar.</p>
                        }
                    </div>
                </div>
                <div className="row textosMenuInicial">
                    <div className="card col d-flex justify-content-center" id="informeCinco">
                        <h3 className="col d-flex justify-content-center tituloInforme">Tabla de Feedbacks</h3>
                        <h1 className="divContenidoTextos">Filtrar por fecha desde o nombre de empleado para mostrar los feedbacks realizados. Si no se elije ninguna fecha ni empleado, se mostrarán todos los feedbacks realizados.</h1>
                        <label className="divContenido">Fecha Desde</label>
                        <input placeholder="Seleccionar fecha" type="date" className="form-control" id="horario" name="fechaDesde" ref={fechaDesde}></input>
                        <br></br>
                        <button onClick={filtroInformeFeedbacks} type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
                        {arrayFeedbacksFiltrado.length > 0 &&
                            <table className="table table-striped table-dark table-hover borderTable">
                                <thead className="thead-ligth">
                                    <tr>
                                        <th scope="col">Comentario</th>
                                        <th scope="col">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arrayFeedbacksFiltrado.map(f => <tr key={f.id}><td key={f.id + "comentario"}>{f.comentario}</td><td key={f.id + "fecha"}>{f.fecha}</td></tr>)}
                                </tbody>
                            </table>
                        }
                        {arrayFeedbacksFiltrado.length <= 0 &&
                            <p className="col-9 d-flex align-items-center pContenido marcaAgua">No hay información para mostrar.</p>
                        }
                    </div>
                </div>
                <br></br><br></br><br></br><br></br>
            </div>
        </div>
    )
}

export default Informes