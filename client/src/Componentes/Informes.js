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
        let year = new Date(d.getFullYear(),0,1);
        let numberOfDays = Math.floor((d - year) / (24 * 60 * 60 * 1000));
        let week= (Math.ceil(( d.getDay() + 1 + numberOfDays) / 7)-1).toString();

        if (week.length < 2){
            week = "0" + week;
        }
        let weekString ="W"+week;

        return [anio, weekString].join('-');
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

    const cantidadPedidosPorMenuPorMes = (idMenu, mesFiltrado) => {
        let contadorPedidos = 0;
        if (mesFiltrado == "") {
            for (let unPedido of pedidosTodos) {
                if (unPedido.menuId == idMenu) {
                    contadorPedidos++;
                }
            }
        }
        else {
            for (let unPedido of pedidosTodos) {
                if (unPedido.menuId == idMenu && formatDateToMonth(unPedido.fechaSolicitud) == mesFiltrado) {
                    contadorPedidos++;
                }
            }
        }

        return contadorPedidos;
    }

    const cantidadPedidosPorMenuPorSemana = (idMenu, semanaFiltrada) => {
        let contadorPedidos = 0;
        console.log(semanaFiltrada)
        if (semanaFiltrada == "") {
            for (let unPedido of pedidosTodos) {
                if (unPedido.menuId == idMenu) {
                    contadorPedidos++;
                }
            }
        }
        else {
            for (let unPedido of pedidosTodos) {
                console.log(formatDateToWeek(unPedido.fechaSolicitud))
                console.log(semanaFiltrada)
                if (unPedido.menuId == idMenu && formatDateToWeek(unPedido.fechaSolicitud) == semanaFiltrada) {
                    contadorPedidos++;
                }
            }
        }
        return contadorPedidos;
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

    const filtroInformePedidos = postData => {
        postData.preventDefault();
        const fechaSeleccionada = fecha.current.value
        const idhorarioSeleccionado = hora.current.value

        while (arrayPedidosFiltrado.length) {
            arrayPedidosFiltrado.pop();
        }

        if (fechaSeleccionada != "" && (idhorarioSeleccionado != "")) {
            for (let unPedido of pedidosTodos) {
                if (formatDateOther(unPedido.fechaSolicitud) == fechaSeleccionada && unPedido.horarioId == idhorarioSeleccionado) {
                    arrayPedidosFiltrado.push(unPedido)
                }
            }
        }

        if (fechaSeleccionada == "" && (idhorarioSeleccionado == "")) {
            for (let unPedido of pedidosTodos) {
                arrayPedidosFiltrado.push(unPedido)
            }
        }

        if (fechaSeleccionada == "" && (idhorarioSeleccionado != "")) {
            for (let unPedido of pedidosTodos) {
                if (unPedido.horarioId == idhorarioSeleccionado) {
                    arrayPedidosFiltrado.push(unPedido)
                }
            }
        }

        if (fechaSeleccionada != "" && (idhorarioSeleccionado == "")) {
            for (let unPedido of pedidosTodos) {
                if (formatDateOther(unPedido.fechaSolicitud) == fechaSeleccionada) {
                    arrayPedidosFiltrado.push(unPedido)
                }
            }
        }
    }

    const filtroInformeEmpleados = postData => {
        postData.preventDefault();
        const mesFiltro = mes.current.value
        console.log(mesFiltro)
        console.log(mes)

        while (arrayEmpleadosFiltrado.length) {
            arrayEmpleadosFiltrado.pop();
        }

        //Se van a mostrar todos los empleados por menu se filtre o no.
        for (let unEmpleado of empleadosTodos) {
            //Se filtra que al menos haya pedido alguno de los menues para mostrar al empleado.
            let cantidadMenuesSolicitados = 0;
            for (let unMenu of menuesTodos) {
                cantidadMenuesSolicitados += pedidosPorEmpleadoYMenu(unEmpleado.id, unMenu.id, mesFiltro)
            }
            if (cantidadMenuesSolicitados > 0) {
                arrayEmpleadosFiltrado.push(unEmpleado)
            }
        }
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

            arrayMenuesFiltradosPorMes.push(menuFiltro)
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
            console.log(menuFiltro.cantidad)
            arrayMenuesFiltradosPorSemana.push(menuFiltro)
        }
    }


    const filtroInformeFeedbacks = postData => {
        postData.preventDefault();
        const fechaDesdeSeleccionada = fechaDesde.current.value
        const idempleadoSeleccionado = empleado.current.value

        while (arrayFeedbacksFiltrado.length) {
            arrayFeedbacksFiltrado.pop();
        }

        if (fechaDesdeSeleccionada != "" && (idempleadoSeleccionado != "")) {
            for (let unFeedback of feedbackTodos) {
                if ((formatDateOther(unFeedback.fecha) > fechaDesdeSeleccionada || formatDateOther(unFeedback.fecha) == fechaDesdeSeleccionada) && unFeedback.empleadoId == idempleadoSeleccionado) {
                    arrayFeedbacksFiltrado.push(unFeedback)
                }
            }
        }

        if (fechaDesdeSeleccionada == "" && (idempleadoSeleccionado == "")) {
            for (let unFeedback of feedbackTodos) {
                arrayFeedbacksFiltrado.push(unFeedback)
            }
        }

        if (fechaDesdeSeleccionada == "" && (idempleadoSeleccionado != "")) {
            for (let unFeedback of feedbackTodos) {
                if (unFeedback.empleadoId == idempleadoSeleccionado) {
                    arrayFeedbacksFiltrado.push(unFeedback)
                }
            }
        }

        if (fechaDesdeSeleccionada != "" && (idempleadoSeleccionado == "")) {
            for (let unFeedback of feedbackTodos) {
                if ((formatDateOther(unFeedback.fecha) > fechaDesdeSeleccionada || formatDateOther(unFeedback.fecha) == fechaDesdeSeleccionada)) {
                    arrayFeedbacksFiltrado.push(unFeedback)
                }
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
                        <h1 className="divContenidoTextos">Filtrar por fecha y/o horario para mostrar información de los pedidos solicitados. Si no se elije ningun filtro, se mostrarán todos los pedidos realizados.</h1>
                        <label className="divContenido">Fecha Elaboración</label>
                        <input placeholder="Seleccionar fecha" type="date" className="form-control" id="fechaId" name="fecha" ref={fecha}></input><br></br>
                        <label className="divContenido">Horario de Almuerzo</label>
                        <select className="form-select divContenido" aria-label="Default select example" id="horario" name="hora" ref={hora}>
                            <option value="">Seleccione Horario</option>
                            {horariosTodos.map(h => <option key={h.id} value={h.id}>{h.hora}</option>)}
                        </select><br></br>
                        <button onClick={filtroInformePedidos} type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
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
                </div>

                <div className="row textosMenuInicial">
                    <div className="card col d-flex justify-content-center">
                        <h3 className="col d-flex justify-content-center tituloInforme">Asistencia de personas por mes</h3>
                        <h1 className="divContenidoTextos">Filtrar por mes para ver la cantidad de pedidos solicitados por empleado en dicho mes agrupados por menu. Si no se elije ningun filtro, se mostrarán la cantidad de pedidos totales acumuladas por empleado agrupados por menu.</h1>
                        <label className="divContenido">Mes</label>
                        <input type="month" id="month" name="mes" className="form-control" ref={mes}></input><br></br>
                        <button onClick={filtroInformeEmpleados} type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>

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
                                        {arrayEmpleadosFiltrado.map(e => <tr key={e.id}><td key={e.id + "nombre"}>{e.nombre}</td><td key={e.id + "cantidad"}>{pedidosPorEmpleadoYMenu(e.id, mn.id)}</td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <h3 className="divContenido">Otros</h3>
                        <p className="divTexto">No se registraron pedidos del resto de los menús en el mes seleccionado.</p>

                    </div>

                </div>

                <div className="row textosMenuInicial">
                    <div className=" card col d-flex justify-content-center">
                        <h3 className="col d-flex justify-content-center tituloInforme">Platos más pedidos del mes</h3>
                        <h1 className="divContenidoTextos">Filtrar por mes para ver la cantidad de pedidos por menu de dicho mes. Si no se elije ningun filtro, se mostrarán la cantidad acumulada de pedidos por menu.</h1>
                        <label className="divContenido">Mes</label>
                        <input type="month" id="month" name="mesFiltro" className="form-control" ref={mesMenu}></input><br></br>
                        <button onClick={filtroMenuesPorMes} type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
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
                    </div>
                </div>
                <div className="row textosMenuInicial">
                    <div className=" card col d-flex justify-content-center">
                        <h3 className="col d-flex justify-content-center tituloInforme">Cantidad de platos elaborados por semana</h3>
                        <h1 className="divContenidoTextos">Filtrar por semana para ver la cantidad de pedidos por menu de dicha semana. Si no se elije ningun filtro, se mostrarán la cantidad acumulada de pedidos por menu.</h1>
                        <label className="divContenido">Semana</label>
                        <input type="week" id="week" name="semanaMenu" className="form-control" ref={semanaMenu}></input><br></br>
                        <button onClick={filtroMenuesPorSemana} type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
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
                    </div>
                </div>
                <div className="row textosMenuInicial">
                    <div className="card col d-flex justify-content-center">
                        <h3 className="col d-flex justify-content-center tituloInforme">Tabla de Feedbacks</h3>
                        <h1 className="divContenidoTextos">Filtrar por fecha desde o nombre de empleado para mostrar los feedbacks realizados. Si no se elije ninguna fecha ni empleado, se mostrarán todos los feedbacks realizados.</h1>
                        <label className="divContenido">Fecha Desde</label>
                        <input placeholder="Seleccionar fecha" type="date" className="form-control" id="horario" name="fechaDesde" ref={fechaDesde}></input>
                        <br></br>
                        <label className="divContenido">Empleados</label>
                        <select className="form-select divContenido" aria-label="Default select example" id="empleados" name="empleado" ref={empleado}>
                            <option value="">Seleccione Empleado</option>
                            {empleadosTodos.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                        </select><br></br>
                        <button onClick={filtroInformeFeedbacks} type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Filtrar</button><br></br>
                        <table className="table table-striped table-dark table-hover borderTable">
                            <thead className="thead-ligth">
                                <tr>
                                    <th scope="col">Empleado</th>
                                    <th scope="col">Comentario</th>
                                    <th scope="col">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrayFeedbacksFiltrado.map(f => <tr key={f.id}><td key={f.id + "nombre"}>{nombreEmpleadoPorId(f.empleadoId)}</td><td key={f.id + "comentario"}>{f.comentario}</td><td key={f.id + "fecha"}>{f.fecha}</td></tr>)}
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