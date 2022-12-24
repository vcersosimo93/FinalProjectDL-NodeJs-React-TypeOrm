import React from 'react';
import Button from 'react-bootstrap/Button';
import Volver_img from '../Images/Volver.png';
import Lapiz_Comidas_Menu_img from '../Images/Lapiz_Comidas_Menu.png';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useRef } from 'react';

const TableHorario = ({ horario }) => {

    const hora = useRef()
    const limitePersonas = useRef()

    const [show, setShow] = useState(false);
    const [showDL, setShowDL] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowDL = () => setShowDL(true);
    const handleCloseDL = () => setShowDL(false);
    const horaHorario = horario.hora
    const limitePersonasHorario = horario.limitePersonas

    const handleSubmitUP = updateData => {

        updateData.preventDefault();
        const idHorario = horario.id
        const horaHorario = hora.current.value
        const limitePers = limitePersonas.current.value

        let url = 'http://localhost:8080/horario/update'
        let method = 'PUT'

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": idHorario,
                "hora": horaHorario,
                "limitePersonas": limitePers
            })
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Error al actualizar horario.');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
                handleClose();
            })
            .catch(err => {
                console.log(err);
                alert("No se pudo modificar el horario seleccionado.");
            });
    }


    const handleSubmitDL = updateData => {

        updateData.preventDefault();
        const idHorario = horario.id

        let url = 'http://localhost:8080/horario/delete'
        let method = 'DELETE'

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": idHorario
            })
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Error al borrar el horario!');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
                handleCloseDL();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <tr key={horario.id} >
            <td >{horario.hora}</td>
            <td >{horario.limitePersonas}</td>
            <td ><Button variant="default" onClick={handleShowDL}><img src={Volver_img} className="iconosOtherOption" /></Button></td>
            <td ><Button variant="default" onClick={handleShow}><img src={Lapiz_Comidas_Menu_img} className="iconosOtherOption" /></Button></td>

            <Modal show={show} className="my-modal" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Horario</Modal.Title>
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
                                defaultValue={horaHorario}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="limitePersonas" >
                            <Form.Label>Limite Personas</Form.Label>
                            <Form.Control
                                type="number"
                                label="Limite Personas"
                                name='limitePersonas'
                                ref={limitePersonas}
                                defaultValue={limitePersonasHorario}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="outline-primary" onClick={handleSubmitUP}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDL} className="my-modal" onHide={handleCloseDL}>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar Horario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="my-modal-form"  >
                        <Form.Group className="mb-3" controlId="Confirmar Borrado" >
                            <Form.Label>Confirma borrar el horario seleccionado?</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="outline-primary" onClick={handleSubmitDL}  >
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </tr>
    )
}

export default TableHorario