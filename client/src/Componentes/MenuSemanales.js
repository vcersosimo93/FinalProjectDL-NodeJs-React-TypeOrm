import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Volver_img from '../Images/Volver.png';
import comida_img from '../Images/ComidasImg.png';
import LogoInicio from '../Images/LogoInicio.jpg';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const MenuSemanales = () => {

    const history = useHistory();
    const [menusProgramados, setMenuesProgramados] = useState([{}]);
    let menusProgramadosAMostrar = []
    const [menuesGet, setmenuesGet] = useState([{}]);
    const [menues, setmenues] = useState();
    const menu = useRef();
    const fechaSeleccionada = useRef();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showError, setShowError] = useState(false);
    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);
    const [modalEliminar, setShowMS] = useState(false);
    const cerrarModalEliminar = () => setShowMS(false);
    const mostrarModalEliminar = () => setShowMS(true);
    const [indexMS, setIndex] = useState(0);
    const [UE, callUE] = useState(0);
    const [modalMenus, setShowM] = useState(false);
    const cerrarModalMenus = () => setShowM(false);
    const mostrarModalMenus = () => setShowM(true);


    useEffect(() => {
        fetch(process.env.REACT_APP_LOCALHOST + '/menu/getAll').then(
            response => response.json()).then(
                data => { setmenuesGet(data.menus) });

        fetch(process.env.REACT_APP_LOCALHOST + '/menuOpcionesFecha/getAllPendientes').then(
            response => response.json()).then(
                data => { setMenuesProgramados(data) });
    }, [UE])


    const menuCargado = (fecha) => {
        if (menusProgramadosAMostrar.length == 0) {
            return false;
        }
        else {
            for (let i = 0; i < menusProgramadosAMostrar.length; i++) {
                let menuFecha = menusProgramadosAMostrar[i].fechaAPublicar;
                if (menuFecha == fecha) {
                    return true;
                }
            }
            return false;
        }
    }

    const cargarMenusProgramados = () => {
        for (let i = 0; i < menusProgramados.length; i++) {
            if (!menuCargado(menusProgramados[i].fechaAPublicar)) {
                let menuProgramado = {

                    fechaAPublicar: menusProgramados[i].fechaAPublicar,
                    menus: []
                }
                menuProgramado.menus.push(menusProgramados[i].menuNombre)
                menusProgramadosAMostrar.push(menuProgramado);
            }
            else {
                for (let j = 0; j < menusProgramadosAMostrar.length; j++) {
                    let menuFecha = menusProgramados[i].fechaAPublicar;
                    let menuFechaPA = menusProgramadosAMostrar[j].fechaAPublicar;
                    if (menuFecha == menuFechaPA) {
                        menusProgramadosAMostrar[j].menus.push(menusProgramados[i].menuNombre);
                    }
                }
            }
        }
    }

    const _onHandleSeleccionMenus = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setmenues(value);
    }

    const postearOpcionMenu = menuOpcionData => {

        menuOpcionData.preventDefault();
        if (menues != undefined && menues[0] != undefined){
        const menuSelecc = menues
        const fechaAPublicar = fechaSeleccionada.current.value
        let reaccionId = 1;
        let url = process.env.REACT_APP_LOCALHOST + '/menuOpcionesFecha/post'
        let method = 'POST'

        console.log(fechaAPublicar)
        console.log(menuSelecc)

        for (let menu of menuSelecc) {
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "menu": menu,
                    "fechaAPublicar": fechaAPublicar,
                    "reaccion": reaccionId
                })
            }).then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    handleShowError();
                } else {
                    callUE(UE + 1);
                    cargarMenusProgramados();
                    handleShow();
                }
            }).catch(err => {
                console.log(err);
            });
            reaccionId++;
        }}
    }

    const cerrarModal = () => {
        handleClose();
    }

    const cerrarModalError = () => {
        handleCloseError();
    }

    const eliminarMS = () => {
        let url = process.env.REACT_APP_LOCALHOST + '/menuOpcionesFecha/delete'
        let method = 'DELETE'

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "fecha": menusProgramadosAMostrar[indexMS].fechaAPublicar
            })
        }).then(res => {
            callUE(UE + 1);
            cargarMenusProgramados();
            cerrarModalEliminar();
        });
    }

    const ExisteIndex = () => {
        if (menusProgramadosAMostrar[indexMS] == undefined || menusProgramadosAMostrar[indexMS].menus == undefined || menusProgramadosAMostrar[indexMS].menus[0] == undefined) {
            return false;
        }
        else { return true; }
    }

    const formatearFecha = (fecha) => {
        if (fecha !== undefined) {
            let fechaFormateada = fecha.substring(8, 10) + "/";
            fechaFormateada += fecha.substring(5, 7) + "/";
            fechaFormateada += fecha.substring(0, 4);
            return fechaFormateada;
        }
    }

    cargarMenusProgramados();

    if (localStorage.getItem("user") == null) {
        history.push('/Login')
    }
    else {
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
                    <h2 className="col-md-12 d-flex justify-content-center textosMenuInicial">Menús Programados</h2>
                    <p className="col-12 d-flex align-items-center pContenidoSinFondo">A continuación se muestra menús programados que aun no han sido publicados para la selección por parte de los empleados.</p>
                    {menusProgramadosAMostrar.length > 0 &&
                        <table className="table table-striped table-dark table-hover borderTable " >
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Ver menús</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menusProgramadosAMostrar.map((m, index) =>
                                (
                                    <tr key={m.fechaAPublicar} onClick={() => setIndex(index)}>
                                        <td >{formatearFecha(m.fechaAPublicar)}</td>
                                        <td ><Button variant="default" onClick={mostrarModalMenus}><img src={comida_img} className="iconosOtherOption" alt="volver" /></Button></td>
                                        <td ><Button variant="default" onClick={mostrarModalEliminar}><img src={Volver_img} className="iconosOtherOption" alt="volver" /></Button></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>}
                    {menusProgramadosAMostrar.length <= 0 &&
                        <div class="alert alert-primary marcaAgua" role="alert">No hay Menús Programados en el sistema para mostrar.</div>
                    }
                    <h2 className="col-md-12 d-flex justify-content-center textosMenuInicial">Programar Menús</h2>
                    <p className="col-12 d-flex align-items-center pContenidoSinFondo">Seleccionar a continuación fecha y opciones de menú/s para preparar el día seleccionado.</p>

                    <div className="row textosMenuInicial">
                        <form action="/button-submit" method="POST" className="card col d-flex justify-content-center">
                            <label className="divContenido">Programar un día</label>
                            <br></br>
                            <label className="divContenido">Fecha de publicación</label>
                            <input placeholder="Seleccionar fecha" type="date" className="form-control" id="fechaAlmuerzo" ref={fechaSeleccionada}></input>
                            <br></br>
                            <label className="divContenido">Menús a Programar</label>
                            {menuesGet.length > 0 &&
                                <select aria-label="Default select example" id="pedido" className="selectpicker selectblack" name="Menu" multiple data-live-search="true" ref={menu} onChange={_onHandleSeleccionMenus}>
                                    {menuesGet.map((h, index) => <option className="itemMenuSemanales" key={index} value={h.id} >{h.descripcion} </option>)}
                                </select>}
                            <br></br>
                            {menuesGet.length > 0 &&
                                <button type="submit" className="btn btn-dark" data-toggle="button" aria-pressed="false" autoComplete="off" onClick={postearOpcionMenu}> Enviar Opciones</button>
                            }<br></br>
                            {menuesGet.length <= 0 &&
                                <p className="col-9 d-flex align-items-center pContenido">No hay menús ingresados en el sistema para seleccionar. Ingresar previamente menús en la solapa "Menús".</p>
                            }

                        </form>
                    </div>
                    <Modal show={show} className="my-modal" onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Guardado de Opciones Menu</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="my-modal-form"  >
                                <Form.Group className="mb-3" controlId="Confirmar Guardado." >
                                    <Form.Label>Se ha guardado correctamente las opciones de menus seleccionados para publicar en la app de mensajería en la fecha seleccionada.</Form.Label>
                                    <Form.Label>Siga eligiendo los menú para completar todos los días de la semana.</Form.Label>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" variant="outline-primary" onClick={cerrarModal}  >
                                Ok, continuar Eligiendo.
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showError} className="my-modal" onHide={handleCloseError}>
                        <Modal.Header closeButton>
                            <Modal.Title>Error</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="my-modal-form"  >
                                <Form.Group className="mb-3" controlId="Confirmar Guardado." >
                                    <Form.Label>La fecha seleccionada debe ser valida.</Form.Label>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" variant="outline-primary" onClick={cerrarModalError}  >
                                Ok
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={modalEliminar} className="my-modal" onHide={cerrarModalEliminar}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar Menú programado</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="my-modal-form"  >
                                <Form.Group className="mb-3" controlId="Confirmar Borrado" >
                                    <Form.Label>¿Confirma borrar el menú programado?</Form.Label>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" variant="outline-primary" onClick={eliminarMS}>
                                Eliminar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={modalMenus} className="my-modal" onHide={cerrarModalMenus}>
                        <Modal.Header closeButton>
                            <Modal.Title>Menús:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="my-modal-form"  >
                                {(ExisteIndex() ? menusProgramadosAMostrar[indexMS].menus.map((menu) =>
                                    <Form.Group className="mb-3" controlId={menu} >
                                        <Form.Label>{menu}</Form.Label>
                                    </Form.Group>) : "")}
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default MenuSemanales