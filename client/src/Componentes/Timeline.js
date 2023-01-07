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

const Timeline = () => {
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
        fetch('http://localhost:8080/horario/get').then(
            response => response.json()
        ).then(data => {setHoras(data)}).
        then(
            fetch('http://localhost:8080/pedido/getTimeline').then(
                response => response.json()
            ).then(data => {setPedidos(data)})
        )
    }, [UE])

    const horaProx = () => {
        if (horas[cntHoras + 1] != undefined){
            setCntHora(cntHoras + 1);
            actualizarMenus(1);
        }
    }

    const horaAnt = ()  => {
        if (horas[cntHoras - 1] != undefined){
            setCntHora(cntHoras - 1);
            actualizarMenus(-1);
        }
    }

    const ExisteIndex = () => {
        if (ordenesAmostrar[indexPedido] == undefined || ordenesAmostrar[indexPedido].usuarios == undefined || ordenesAmostrar[indexPedido].usuarios[0] == undefined){
        return false;}
        else{return true;}

    }
    const actualizarMenus = (num) => {
        ordenesAmostrar.splice(0,ordenesAmostrar.length)
        for (let i = 0; i < ordenes.length; i++ ) {
            if (ordenes[i].horarioId == horas[cntHoras + num].id)
            ordenesAmostrar.push(ordenes[i]);
          }
    }

    const menuCargado = (menu, horario) => {
        
        if (ordenes.length == 0)
        {       
            return false;     
        }
        else{
            for (let i = 0; i < ordenes.length; i++ ) {
                if(ordenes[i].id == menu && ordenes[i].horarioId == horario){
                    return true;
                }
            }     
            return false;
        }
    }

    const cargarMenus = () => {
        for (let i = 0; i < pedidos.length; i++ ) {
            if (!menuCargado(pedidos[i].menuId, pedidos[i].horarioId)){
                let orden = {
                    id : pedidos[i].menuId,
                    nombre : pedidos[i].menuNombre,
                    horarioId : pedidos[i].horarioId,
                    cantidad : 1,
                    usuarios : []
                 }
                 orden.usuarios.push(pedidos[i].empleadoNombre)
                 ordenes.push(orden);
            }
            else{
                for(let j = 0; j < ordenes.length; j++){
                    if (pedidos[i].menuId == ordenes[j].id && pedidos[i].horarioId ==  ordenes[j].horarioId)
                    {
                     ordenes[j].cantidad ++;
                     ordenes[j].usuarios.push(pedidos[i].empleadoNombre);
                    }  
                }    
            }
        }
    }

    const finalizarPedidos = async () =>{
       await fetch('http://localhost:8080/pedido/finalizar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "menuId": ordenesAmostrar[indexPedido].id,
                "horarioId": ordenesAmostrar[indexPedido].horarioId,
            })
        }).then(
             await callUE(UE + 1),
             cargarMenus(),
             actualizarMenus(0),
             MFClose()
        )
    }

    cargarMenus();
    actualizarMenus(0);

    return (
        <div className="container m-2">
            <div class="row heading" >
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
                <div className="row" style={{ "paddingTop": "2%" }} ></div>
                <div className="row tableRedonda">
                    <div className="col d-flex justify-content-center transparent">
                        <img src={flechaIzq} className="transparent" alt="flechaIzq" onClick={() => horaAnt()} />
                    </div>
                    <div className="col d-flex justify-content-center transparent">
                        <h2 className='transparent'>{(horas[cntHoras].hora != undefined ? horas[cntHoras].hora.slice(0, 5) : "")}</h2>
                    </div>
                    <div className="col d-flex justify-content-center transparent">
                        <img src={flechaDer} className="transparent" alt="flechaDer" onClick={() => horaProx()} />
                    </div>
                </div>
            </div>
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
                            <tr  key={o.id} onClick={ () => setIndex(index)}>
                                <td onClick={handleShow}>{o.nombre}</td>
                                <td className= "text-center">{o.cantidad}</td>
                                <td onClick={MFShow}><img src={Finalizar_img} className = "iconoGeneral"  alt="finalizar"/></td>
                            </tr>        
                        ))}
                    </tbody>
                </table>
                
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
                                {(ExisteIndex() ? ordenesAmostrar[indexPedido].usuarios.map((usuario) =>
                                <Form.Group className="mb-3" controlId={usuario} >
                                <Form.Label>{usuario}</Form.Label>
                                </Form.Group>) : "")}  
                        </Form>
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default Timeline