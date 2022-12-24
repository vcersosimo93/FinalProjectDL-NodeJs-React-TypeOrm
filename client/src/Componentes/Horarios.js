import React from 'react';
import Filtro_Comidas_img from '../Images/Filtro_Comidas.png';
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


const Horario = () => {

    const hora = useRef()
    const limitePersonas = useRef()
    const [horarios, setHorarios] = useState([{}]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch('http://localhost:8080/horario/get').then(
            response => response.json())
            .then(
                data => {
                    setHorarios(data);
                }
            )
    }, [horarios])

    
    const handleSubmit = postData => {

        postData.preventDefault();
        const horaHorario = hora.current.value
        const limitePersonasHorario = limitePersonas.current.value

        let url = 'http://localhost:8080/horario/post';
        let method = 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "hora": horaHorario,
                "limitePersonas": limitePersonasHorario
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
                const post = {
                    hora: resData.post.hora,
                    limitePersonas: resData.post.limitePersonas
                };
                handleClose();
            })
            .catch(err => {
                console.log(err);
                alert("No Se pudo Ingresar el horario. Complete todos los campos.");
            });

    }

    return (
        <div className="container m-2">
            <div className="row heading" >
                <div className="col-md-2 align-self-start">
                        <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
                    </div>
                    <div className="col-md-9 d-flex flex-row-reverse">
                        <div className="linkContainerSecondOption" >
                            <Button variant="default" onClick={handleShow}>
                                <img src={Agregar_Menu_img} className="iconosImgThirdOption" />
                            </Button>
                        </div>
                    </div>
                    <div className="col-md-1 d-flex flex-row-reverse">
                        <NavLink exact to="/Inicio" id="dash" >
                            <div className="linkContainerSecondOption" >
                                <img src={Volver_img} className="iconosImgSecondOption" />
                            </div>
                        </NavLink>
                    </div>
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
                                    <Form.Group className="mb-3" controlId="limitePersonas" >
                                        <Form.Label>Limite Personas</Form.Label>
                                        <Form.Control
                                            type="number"
                                            label="Limite Personas"
                                            name='limitePersonas'
                                            ref={limitePersonas}
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
                    <table className="table table-striped table-dark table-hover borderTable new" style={{ "paddingTop": "20%" }}>
                        <thead>
                            <tr>
                                <th scope="col">Hora</th>
                                <th scope="col">Limite Personas</th>
                                <th scope="col">Eliminar</th>
                                <th scope="col">Modificar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {horarios.map((h,index) =>
                            (
                                <TableHorario key={index} horario={h} />
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
    )
}

export default Horario;


