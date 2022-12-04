import React from 'react';
import flechaDer from '../Images/flechaDer.png';
import flechaIzq from '../Images/flechaIzq.png';
import LiquidarImg from '../Images/TimelineLiquidar.png';
import cambiarHoraImg from '../Images/TimelineCambiarHora.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
//import getProximoHorario from '../domain/src/controllers/HorarioController.ts';

const Timeline = () => {
    const [horas, setBackendData] = useState([]);
    const [cntHoras, setCntHora] = useState(0);
    const [pedidos, setPedidos] = useState([]);
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
        console.log(data)
        //setBackendData(data.hora)
      }
    )
  }, [])

    let pedidosGral = [{id : 1,nombre: "Milanesa con arroz" , hora:'09:45'},
    {id : 2, nombre: "Frutilla" , hora:'10:00'},
    {id : 3, nombre: "Manzana", hora:'09:45'}]


    const horaProx = () => {
        if (horas[cntHoras + 1] != null)
        setCntHora(cntHoras + 1)
        actualizarPedidos(1);
    }

    const horaAnt = () => {
        if (horas[cntHoras - 1] != null)
         setCntHora(cntHoras - 1)
         actualizarPedidos(-1);
    }

    const actualizarPedidos = (num) => {
        pedidos.splice(0,pedidos.length)
        for (const element of pedidosGral) {
            if (element.hora == horas[cntHoras + num])
            pedidos.push(element)
          }
    }

    function culminarPedido(PedidoId) {
    console.log(PedidoId);
    }

    const reprogramarPedido = PedidoId => {   
    }

    //Llamada de arranque
    actualizarPedidos(0);

    return (
        <div className="container">  
            <div className="row" style={{"paddingTop":"2%"}} ></div>   
            <div className="row tableRedonda">
                <div className="col d-flex justify-content-center transparent">
                    <img src={flechaIzq} className="flechasTimeline" alt="flechaIzq" onClick={() => horaAnt()}/>
                </div>
                <div className="col d-flex justify-content-center transparent">
                    <h2 className='transparent'>{horas[cntHoras]}</h2>
                </div>
                <div className="col d-flex justify-content-center transparent">
                    <img src={flechaDer} className="flechasTimeline" alt="flechaDer" onClick={() => horaProx()}/>
                </div>
            </div> 
            <div className="container " style={{"paddingTop":"5%"}}>
                <div className="container tableGridTimeline" >
                    {pedidos.map((pedido) =>
                    (<div key={pedido.id} className="container itemTimeline " >
                    <p>
                    {pedido.nombre}               
                    <img src={LiquidarImg}  style={{"margin-left":"55%"}} alt="Liquidar" onClick={handleShowL} />
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