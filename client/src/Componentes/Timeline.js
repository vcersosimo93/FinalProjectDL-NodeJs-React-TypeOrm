import React from 'react';
import flechaDer from '../Images/flechaDer.png';
import flechaIzq from '../Images/flechaIzq.png';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import LogoInicio from '../Images/LogoInicio.jpg';
import Volver_img from '../Images/Volver.png';
import { NavLink } from 'react-router-dom';
import Finalizar_img from '../Images/TimelineLiquidar.png'
import { useHistory } from 'react-router-dom';

const Timeline = () => {
    const history = useHistory();
    let ordenes = [];
    let ordenesAmostrar = [];
    const [UE, callUE] = useState(0);
    const [horas, setHoras] = useState([{}]);
    const [cntHoras, setCntHora] = useState(0);
    const [pedidos, setPedidos] = useState([{}]);
    const [show, setShow] = useState(false);
    const [ModalFinalizar, mostrarMF] = useState(false);
    const [indexPedido, setIndex] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const MFClose = () => mostrarMF(false);
    const MFShow = () => mostrarMF(true);

    useEffect(() => {
        fetchHorario();
        fetchTimeline();
    }, [UE])

    function fetchHorario() {
        fetch(process.env.REACT_APP_LOCALHOST + '/horario/get').then(
            response => response.json()).then(data => { setHoras(data) });
    }

    function fetchTimeline() {
        fetch(process.env.REACT_APP_LOCALHOST + '/pedido/getTimeline').then(
            response => response.json()).then(data => { setPedidos(data) })
    }

    const horaProx = () => {
        if (horas[cntHoras + 1] !== undefined) {
            setCntHora(cntHoras + 1);
            actualizarMenus(1);
        }
    }

    const horaAnt = () => {
        if (horas[cntHoras - 1] !== undefined) {
            setCntHora(cntHoras - 1);
            actualizarMenus(-1);
        }
    }

    const ExisteIndex = () => {
        if (ordenesAmostrar[indexPedido] === undefined || ordenesAmostrar[indexPedido].usuarios === undefined || ordenesAmostrar[indexPedido].usuarios[0] === undefined) {
            return false;
        }
        else { return true; }

    }
    const actualizarMenus = (num) => {
        ordenesAmostrar.splice(0, ordenesAmostrar.length)
        for (let i = 0; i < ordenes.length; i++) {
            if (horas.length > 0 && ordenes[i].horarioId === horas[cntHoras + num].id)
                ordenesAmostrar.push(ordenes[i]);
        }
    }

    const menuCargado = (menu, horario) => {

        if (ordenes.length === 0) {
            return false;
        }
        else {
            for (let i = 0; i < ordenes.length; i++) {
                if (ordenes[i].id === menu && ordenes[i].horarioId === horario) {
                    return true;
                }
            }
            return false;
        }
    }

    const cargarMenus = () => {
        for (let i = 0; i < pedidos.length; i++) {
            if (!menuCargado(pedidos[i].menuId, pedidos[i].horarioId)) {
                let orden = {
                    id: pedidos[i].menuId,
                    nombre: pedidos[i].menuNombre,
                    horarioId: pedidos[i].horarioId,
                    cantidad: 1,
                    usuarios: []
                }
                orden.usuarios.push(pedidos[i].empleadoNombre)
                ordenes.push(orden);
            }
            else {
                for (let j = 0; j < ordenes.length; j++) {
                    if (pedidos[i].menuId === ordenes[j].id && pedidos[i].horarioId === ordenes[j].horarioId) {
                        ordenes[j].cantidad++;
                        ordenes[j].usuarios.push(pedidos[i].empleadoNombre);
                    }
                }
            }
        }
    }

    const finalizarPedidos = async () => {
        fetch(process.env.REACT_APP_LOCALHOST + '/pedido/finalizar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "menuId": ordenesAmostrar[indexPedido].id,
                "horarioId": ordenesAmostrar[indexPedido].horarioId,
            })}).then(callUE(UE + 1))
            .then(cargarMenus())
            .then(actualizarMenus(0))
            .then(MFClose());
    }

    cargarMenus();
    actualizarMenus(0);

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
                    <div className="col d-flex flex-row-reverse" style={{ "paddingTop": "2%" }}>
                        <NavLink exact to="/Inicio" id="dash" >
                            <div className="linkContainerSecondOption" >
                                <img src={Volver_img} alt="volverImg" className="iconosImgSecondOption" />
                            </div>
                        </NavLink>
                    </div>
                    <h2 className="col-md-12 d-flex justify-content-center textosMenuInicial">Servicio</h2>
                    <p className="col-12 d-flex align-items-center pContenidoSinFondo">A continuación se muestra para cada horario de almuerzo, la cantidad de platos a realizar por cada opción de menú del día. A su vez cada vez que se prepare un plato, se puede cambiar estado del mismo. Para ver los menues a realizar en cada horario, desplazarse con las flechas derecha e izquierda.</p>
                    <div className="row" style={{ "paddingTop": "2%" }} ></div>
                    {horas.length > 0 &&
                        <div className="row tableRedonda">
                            <div className="col d-flex justify-content-center transparent">
                                <img src={flechaIzq} className="transparent" alt="flechaIzq" onClick={() => horaAnt()} />
                            </div>
                            <div className="col d-flex justify-content-center transparent">
                                <h2 className='transparent'>{(horas[cntHoras].hora !== undefined ? horas[cntHoras].hora.slice(0, 5) : "")}</h2>
                            </div>
                            <div className="col d-flex justify-content-center transparent">
                                <img src={flechaDer} className="transparent" alt="flechaDer" onClick={() => horaProx()} />
                            </div>
                        </div>
                    }
                    {horas.length <= 0 &&
                        <div className="alert alert-primary marcaAgua" role="alert">No hay horarios ingresados en el sistema para mostrar los pedidos por horario.</div>
                    }
                </div>


                {ordenesAmostrar.length > 0 && horas.length > 0 &&
                    <table className="table table-striped table-dark table-hover borderTable " style={{ "paddingTop": "20%" }}>
                        <thead>
                            <tr>
                                <th scope="col">Menu</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Finalizar pedido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenesAmostrar.map((o, index) =>
                            (
                                <tr key={index} onClick={() => setIndex(index)}>
                                    <td onClick={handleShow}>{o.nombre}</td>
                                    <td className="text-center">{o.cantidad}</td>
                                    <td onClick={MFShow}><img src={Finalizar_img} className="iconoGeneral" alt="finalizar" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {ordenesAmostrar.length <= 0 && horas.length > 0 &&
                    <div className="alert alert-primary marcaAgua" role="alert">No hay pedidos realizados para mostrar en el horario seleccionado.</div>
                }

                <Modal show={ModalFinalizar} className="my-modal" onHide={MFClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>¿Finalizar pedido?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button variant="outline-primary" onClick={finalizarPedidos}>
                            Si
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-primary" onClick={MFClose}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show} className="my-modal" onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comensales:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="my-modal-form"  >
                            {(ExisteIndex() ? ordenesAmostrar[indexPedido].usuarios.map((usuario,index) =>
                                <Form.Group className="mb-3"  controlId={usuario} >
                                    <Form.Label >{usuario}</Form.Label>
                                </Form.Group>) : "")}
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Timeline