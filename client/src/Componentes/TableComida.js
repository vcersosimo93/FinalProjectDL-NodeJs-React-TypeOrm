import React from 'react';
import Button from 'react-bootstrap/Button';
import Volver_img from '../Images/Volver.png';
import Lapiz_Comidas_Menu_img from '../Images/Lapiz_Comidas_Menu.png';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Form from 'react-bootstrap/Form';
import { useRef } from 'react';

const TableComida = ({ menu }) => {

 
    

    const descripcion = useRef()
    const esVegetariano = useRef()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const descripcionMenu = menu.descripcion
    const esVegetarianoMenu = menu.esVegetariano
    let [vege, setveg] = useState("");


    const _onChangeVegetarianoUP = () => {
        try {
            ; (async () => {
                console.log("_onChangeVegetariano");
                console.log(esVegetariano.current.checked);
                setveg = esVegetariano

            })()
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmitUP = updateData => {

        updateData.preventDefault();
        const idMenu = menu.id
        const desc = descripcion.current.value
        const esVeget = esVegetariano.current.checked

        let url = 'http://localhost:8080/menu/update'
        let method = 'PUT'

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
                    throw new Error('Creating or editing a post failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
                const post = {
                    esVegetariano: resData.post.esVegetariano,
                    descipcion: resData.post.descipcion
                };
            })
            .catch(err => {
                console.log(err);
            });
    }


    const handleSubmitDL = updateData => {


        console.log(menu.id)
        updateData.preventDefault();
        const idMenu = menu.id

        let url = 'http://localhost:8080/menu/delete'
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
            })
            .catch(err => {
                console.log(err);
            });
    }

  return (
    <tr key = {menu.id}>
      <th scope='row'>{menu.id}</th>
      <td>{menu.descripcion}</td>
      <td>
      </td>
      <Button variant="default" onClick={handleSubmitDL}  >
        <img src={Volver_img}  /> 
      </Button>
      <Button variant="default" onClick={handleShow}  >
        <img src={Lapiz_Comidas_Menu_img}  /> 
      </Button>

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
                                        placeholder = "prueba"
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
    </tr>
  )
}

export default TableComida