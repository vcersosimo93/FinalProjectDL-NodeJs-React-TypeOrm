import React from 'react';
import flechaDer from '../Images/flechaDer.png';
import flechaIzq from '../Images/flechaIzq.png';
import LiquidarImg from '../Images/TimelineLiquidar.png';
import cambiarHoraImg from '../Images/TimelineCambiarHora.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';

const Timeline = () => {
    let ordenes = [];
    let ordenesAmostrar = [];
    const [horas, setHoras] = useState([{}]);
    const [cntHoras, setCntHora] = useState(0);
    const [pedidos, setPedidos] = useState([{}]);
    const [showL, setShowL] = useState(false);
    const handleCloseL = () => setShowL(false);
    const handleShowL = () => setShowL(true);

    useEffect(() => {
        fetch('http://localhost:8080/horario/get').then(
            response => response.json()
        ).then(
            data => {
                setHoras(data)
            }
        ).then(
            fetch('http://localhost:8080/pedido/get').then(
                response => response.json()
            ).then(
                data => {
                    setPedidos(data)
                }
            )
        )
    }, [])

    const horaProx = () => {
        if (horas[cntHoras + 1] != null)
            setCntHora(cntHoras + 1)
        actualizarMenus(1);
    }

    const horaAnt = () => {
        if (horas[cntHoras - 1] != null)
            setCntHora(cntHoras - 1)
        actualizarMenus(-1);
    }

    const actualizarMenus = (num) => {
        ordenesAmostrar.splice(0,ordenesAmostrar.length)
        for (let i = 0; i < ordenes.length; i++ ) {
            if (ordenes[i].horarioId == horas[cntHoras + num].id)
            ordenesAmostrar.push(ordenes[i])
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
                    horarioId : pedidos[i].horarioId,
                    cantidad : 0
                 }
                 ordenes.push(orden);
            }
        }
    }

    const cargarCantidadesMenus = () => {
        for (let i = 0; i < pedidos.length; i++ ) {
            for (let j = 0; j < ordenes.length; j++ ) {
               if (pedidos[i].menuId == ordenes[j].id && pedidos[i].horarioId ==  ordenes[j].horarioId)
               {
                ordenes[j].cantidad ++;
               }
              }
          } 
    }



    //Llamadas de arranque
    cargarMenus();
    cargarCantidadesMenus();
    actualizarMenus(0);

    return (
        <div className="container">
            <div className="row" style={{ "paddingTop": "2%" }} ></div>
            <div className="row tableRedonda">
                <div className="col d-flex justify-content-center transparent">
                    <img src={flechaIzq} className="flechasTimeline" alt="flechaIzq" onClick={() => horaAnt()} />
                </div>
                <div className="col d-flex justify-content-center transparent">
                    <h2 className='transparent'>{horas[cntHoras].hora}</h2>
                </div>
                <div className="col d-flex justify-content-center transparent">
                    <img src={flechaDer} className="flechasTimeline" alt="flechaDer" onClick={() => horaProx()} />
                </div>
            </div>
            <div className="container " style={{ "paddingTop": "5%" }}>
                <div className="container tableGridTimeline" >
                    {ordenesAmostrar.map((orden) =>
                    (<div key={orden.id} className="container itemTimeline " >
                    <p style={{"margin-left":"5%"}}>
                    {orden.id} - 
                    {orden.cantidad}               
                    <img src={LiquidarImg} style={{"margin-left":"55%"}} alt="Liquidar" onClick={handleShowL} />
                    </p>
                     </div>))}
                </div>
            </div>

                <Modal show={showL} className="my-modal" onHide={handleCloseL}>
                    <Modal.Header closeButton>
                    <Modal.Title>Terminar pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary">
                        Finalizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    )
}

export default Timeline