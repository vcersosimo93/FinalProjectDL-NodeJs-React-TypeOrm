import React from 'react';
import Agregar_Menu_img from '../Images/Agregar_Menu.png';
import Volver_img from '../Images/Volver.png';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import TableHorario from './TableHorario';
import LogoInicio from '../Images/LogoInicio.jpg';
import { useHistory } from 'react-router-dom';


const Horario = () => {

    const history = useHistory();
    const hora = useRef()
    const [horarios, setHorarios] = useState([{}]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showErrorHora, setShowErrorHora] = useState(false);
    const handleCloseErrorHora = () => setShowErrorHora(false);
    const handleShowErrorHora = () => setShowErrorHora(true);

    const [showErrorHoraMayor, setShowErrorHoraMayor] = useState(false);
    const handleCloseErrorHoraMayor = () => setShowErrorHoraMayor(false);
    const handleShowErrorHoraMayor = () => setShowErrorHoraMayor(true);


    useEffect(() => {
        fetch(process.env.REACT_APP_LOCALHOST + '/horario/get').then(
            response => response.json())
            .then(
                data => {
                    setHorarios(data);
                }
            )
    }, [horarios])

    const cerrarModalHora = () => {
        handleCloseErrorHora();
    }

    const checkHorario = () => {
        let cantidadHorarios = 0
        for (let unHorario of horarios) {
            cantidadHorarios++;
        }
        return [cantidadHorarios];
    }

    const checkHorarioExiste = (nuevaHora) => {
        for (let unHorario of horarios) {
            let hora = unHorario.hora;
            const first5 = hora.slice(0, 5);
            if (first5 == nuevaHora) {
                return true;
            }
        }
        return false;
    }

    const cerrarModalHoraMayor = () => {
        handleCloseErrorHoraMayor();
    }


    const handleSubmit = postData => {

        postData.preventDefault();
        const horaHorario = hora.current.value
        let reaccionHorarioId = checkHorario();
        const horarioCheck = checkHorarioExiste(horaHorario);

        if (horarios != null) {
            //reaccionHorarioId = horarios.length + 1;
        }


        let url = process.env.REACT_APP_LOCALHOST + '/horario/post';
        let method = 'POST';

        if (!horarioCheck) {
            if (reaccionHorarioId[0] < 9) {
                fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "hora": horaHorario,
                        "reaccionHorario": reaccionHorarioId
                    })
                })
                    .then(res => {
                        if (res.status !== 200 && res.status !== 201) {
                            throw new Error('Fallo el alta del nuevo horario!');
                        }
                        return res.json();
                    })
                    .then(resData => {
                        console.log(resData);
                        reaccionHorarioId++;
                        handleClose();
                    }).catch(err => {
                        console.log(err);
                        /* 
                        if (reaccionHorarioId[0] > 8) {
                            alert("No se puede añadir un horario superior a id 9.");
                        }
                        else {
                            handleShowErrorHora()
                        }*/
                    })
            } else {
                handleShowErrorHoraMayor();
            }
        }else {
            handleShowErrorHora();
        }
    }

    if (localStorage.getItem("user") == null) {
        history.push('/Login')
    }
    else {
        return (
            <div className="container m-2">
                <div className="row heading" >
                    <div className="col-md-2 d-flex">
                        <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
                    </div>
                    <div className="col-md-9 d-flex flex-row-reverse" style={{ "paddingTop": "2%" }}>
                        <div className="linkContainerSecondOption" >
                            <Button variant="default" onClick={handleShow}>
                                <img src={Agregar_Menu_img} className="iconosImgThirdOption" alt="agregar" />
                            </Button>
                        </div>
                    </div>
                    <div className="col-md-1 d-flex flex-row-reverse" style={{ "paddingTop": "2%" }}>
                        <NavLink exact to="/Inicio" id="dash" >
                            <div className="linkContainerSecondOption" >
                                <img src={Volver_img} className="iconosImgSecondOption" alt="volver" />
                            </div>
                        </NavLink>
                    </div>
                    <h2 className="col-md-12 d-flex justify-content-center textosMenuInicial">Horarios</h2>
                    <p className="col-12 d-flex align-items-center pContenidoSinFondo">A continuación se muestra listado de horarios ingresados en el sistema. En el mismo se permite modificar y eliminar los existentes, y también es posible agregar nuevos (Presionando "+").</p>
                    <div className="col-md-1" >
                        <Modal show={show} className="my-modal" onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Crear Horario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="my-modal-form"  >
                                    <Form.Group className="mb-3" controlId="descripcion" >
                                        <Form.Label>Hora</Form.Label>
                                        <Form.Control
                                            type="time"
                                            placeholder="Nuevo horario"
                                            autoFocus
                                            name="hora"
                                            ref={hora}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" variant="outline-primary" onClick={handleSubmit}>
                                    Crear
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className="container">
                    {horarios.length > 0 &&
                        <table className="table table-striped table-dark table-hover borderTable new" style={{ "paddingTop": "20%" }}>
                            <thead>
                                <tr>
                                    <th scope="col">Hora</th>
                                    <th scope="col">Eliminar</th>
                                    <th scope="col">Modificar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {horarios.sort((a, b) => a.hora > b.hora ? 1 : -1)
                                    .map((h, index) =>
                                    (
                                        <TableHorario key={index} horario={h} />
                                    ))}
                            </tbody>
                        </table>
                    }
                    {horarios.length <= 0 &&
                        <div className="alert alert-primary marcaAgua" role="alert">No hay Horarios ingresados en el sistema para mostrar.</div>
                    }
                </div>
                <Modal show={showErrorHora} className="my-modal" onHide={handleCloseErrorHora}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="my-modal-form"  >
                            <Form.Group className="mb-3" controlId="Fecha no valida." >
                                <Form.Label>Ya existe la hora registrada.</Form.Label>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="outline-primary" onClick={cerrarModalHora}  >
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showErrorHoraMayor} className="my-modal" onHide={handleCloseErrorHoraMayor}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="my-modal-form"  >
                            <Form.Group className="mb-3" controlId="Fecha no valida." >
                                <Form.Label>La cantidad de horarios no puede ser mayor a 9.</Form.Label>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="outline-primary" onClick={cerrarModalHoraMayor}  >
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Horario;


