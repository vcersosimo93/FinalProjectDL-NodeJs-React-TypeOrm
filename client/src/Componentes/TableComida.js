import React from 'react';
import Button from 'react-bootstrap/Button';
import Volver_img from '../Images/Volver.png';
import Lapiz_Comidas_Menu_img from '../Images/Lapiz_Comidas_Menu.png';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useRef } from 'react';

const TableComida = ({ menu }) => {

    const descripcion = useRef()
    const esVegetariano = useRef()

    const [show, setShow] = useState(false);
    const [showDL, setShowDL] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowDL = () => setShowDL(true);
    const handleCloseDL = () => setShowDL(false);
    const descripcionMenu = menu.descripcion
    const esVegetarianoMenu = menu.esVegetariano

    const [showErrorMenu, setShowErrorMenu] = useState(false);
    const handleCloseErrorMenu = () => setShowErrorMenu(false);
    const handleShowErrorMenu = () => setShowErrorMenu(true);

    const _onChangeVegetarianoUP = () => {
        try {
            ; (async () => {
                console.log("_onChangeVegetariano");
                console.log(esVegetariano.current.checked);

            })()
        } catch (error) {
            console.error(error)
        }
    }

    const cerrarModalError = () => {
        handleCloseErrorMenu();
    }

    const handleSubmitUP = updateData => {

        updateData.preventDefault();
        const idMenu = menu.id
        const desc = descripcion.current.value
        const esVeget = esVegetariano.current.checked

        let url = process.env.REACT_APP_LOCALHOST + '/menu/update'
        let method = 'PUT'

        if (desc.length > 0) {

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": idMenu,
                    "esVegetariano": esVeget,
                    "descripcion": desc
                })
            })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        console.log(res)
                        throw new Error('Fallo la modificación del menú.');
                    }
                    return res.json();
                })
                .then(resData => {
                    console.log(resData);
                    handleClose();
                })
                .catch(err => {
                    console.log(err);
                    alert("No se pudo modificar el menu seleccionado. Ya esta creada alguna opcion menu por fecha a publicar, o hay pedidos asociados a este menu. ");
                });
        }else{
            handleShowErrorMenu();
        }
    }


    const handleSubmitDL = updateData => {


        console.log(menu.id)
        updateData.preventDefault();
        const idMenu = menu.id

        let url = process.env.REACT_APP_LOCALHOST + '/menu/delete'
        let method = 'DELETE'

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": idMenu
            })
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Deleting a post failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
                handleCloseDL();
            })
            .catch(err => {
                console.log(err);
                alert("No se pudo eliminar el menu seleccionado. Ya esta creada alguna opcion menu por fecha a publicar, o hay pedidos asociados a este menu. ");
            });
    }

    const boolToString = (boolean) => {
        if (boolean) {
            return "Si"
        }
        else {
            return "No"
        }
    }

    return (
        <tr key={menu.id} >
            <td >{menu.descripcion}</td>
            <td >{boolToString(menu.esVegetariano)}</td>
            <td ><Button variant="default" onClick={handleShowDL}><img src={Volver_img} className="iconosOtherOption" alt="volver" /></Button></td>
            <td ><Button variant="default" onClick={handleShow}><img src={Lapiz_Comidas_Menu_img} className="iconosOtherOption" alt="modificar" /></Button></td>

            <Modal show={show} className="my-modal" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="my-modal-form"  >
                        <Form.Group className="mb-3" controlId="descripcion" >
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                placeholder="Descripción"
                                name="descripcion"
                                ref={descripcion}
                                defaultValue={descripcionMenu}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="esVegetariano"
                        >
                            <Form.Check
                                type="checkbox"
                                label="Vegetariano"
                                name='esVegetariano'
                                ref={esVegetariano}
                                defaultChecked={esVegetarianoMenu}
                                onChange={_onChangeVegetarianoUP}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="outline-primary" onClick={handleSubmitUP}  >
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDL} className="my-modal" onHide={handleCloseDL}>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar Menú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="my-modal-form"  >
                        <Form.Group className="mb-3" controlId="Confirmar Borrado" >
                            <Form.Label>Confirma borrar el menú seleccionado?</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="outline-primary" onClick={handleSubmitDL}  >
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorMenu} className="my-modal" onHide={handleCloseErrorMenu}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="my-modal-form"  >
                        <Form.Group className="mb-3" controlId="Fecha no valida." >
                            <Form.Label>La descripcion no puede estar vacia.</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="outline-primary" onClick={cerrarModalError}  >
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </tr>
    )
}

export default TableComida