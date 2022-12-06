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
    let menus = [];
    let menusAmostrar = [];
    const [horas, setHoras] = useState([{}]);
    const [cntHoras, setCntHora] = useState(0);
    const [pedidos, setPedidos] = useState([{}]);
    const [showR, setShowR] = useState(false);
    const handleCloseR = () => setShowR(false);
    const handleShowR = () => setShowR(true);
    const [showL, setShowL] = useState(false);
    const handleCloseL = () => setShowL(false);
    const handleShowL = () => setShowL(true);

useEffect(() =>{
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
        menusAmostrar.splice(0,menusAmostrar.length)
        for (let i = 0; i < menus.length; i++ ) {
            if (menus[i].horarioId == horas[cntHoras + num].id)
            menusAmostrar.push(menus[i])
          }
    }

    const menuCargado = (menu, horario) => {
        
        if (menus.length == 0)
        {
          
            return false;
            
        }
        else{
            for (let i = 0; i < menus.length; i++ ) {
                if(menus[i].id == menu && menus[i].horarioId == horario){
                   
                    return true;
                }
            }
            
            return false;
        }
    }

    const cargarMenus = () => {
        for (let i = 0; i < pedidos.length; i++ ) {
            if (!menuCargado(pedidos[i].menuId, pedidos[i].horarioId)){
                let menu = {
                    id : pedidos[i].menuId,
                    horarioId : pedidos[i].horarioId,
                    cantidad : 0
                 }
                 menus.push(menu);
                 //console.log(menus);
            }
          } 
    }

    const cargarCantidadesMenus = () => {
        for (let i = 0; i < pedidos.length; i++ ) {
            for (let j = 0; j < menus.length; j++ ) {
               if (pedidos[i].menuId == menus[j].id && pedidos[i].horarioId ==  menus[j].horarioId)
               {
                menus[j].cantidad ++;
               }
              }
          } 
    }

    function culminarPedido(PedidoId) {
    }

    const reprogramarPedido = PedidoId => {   
    }

    //Llamadas de arranque
    cargarMenus();
    cargarCantidadesMenus();
    actualizarMenus(0);

    return (
        <div className="container">  
            <div className="row" style={{"paddingTop":"2%"}} ></div>   
            <div className="row tableRedonda">
                <div className="col d-flex justify-content-center transparent">
                    <img src={flechaIzq} className="flechasTimeline" alt="flechaIzq" onClick={() => horaAnt()}/>
                </div>
                <div className="col d-flex justify-content-center transparent">
                    <h2 className='transparent'>{horas[cntHoras].hora}</h2>
                </div>
                <div className="col d-flex justify-content-center transparent">
                    <img src={flechaDer} className="flechasTimeline" alt="flechaDer" onClick={() => horaProx()}/>
                </div>
            </div> 
            <div className="container " style={{"paddingTop":"5%"}}>
                <div className="container tableGridTimeline" >
                    {menusAmostrar.map((menu) =>
                    (<div key={menu.id} className="container itemTimeline " >
                    <p style={{"margin-left":"5%"}}>
                    {menu.id} - 
                    {menu.cantidad}               
                    <img src={LiquidarImg} style={{"margin-left":"55%"}} alt="Liquidar" onClick={handleShowL} />
                    <img src={cambiarHoraImg} alt="Cambiar hora"  onClick={handleShowR}/>
                    </p>
                     </div>))}
                </div>
            </div>  

            <Modal show={showR} className="my-modal" onHide={handleCloseR}>
                    <Modal.Header closeButton>
                    <Modal.Title>Reprogramar pedido</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form className="my-modal-form" >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nuevo horario</Form.Label>
                        <Form.Group
                            type="list"  
                            autoFocus           
                        />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="outline-primary">
                        Reprogramar
                    </Button>
                    </Modal.Footer>
                </Modal>

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