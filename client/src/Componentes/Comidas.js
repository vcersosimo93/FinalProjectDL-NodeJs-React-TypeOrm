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
import TableComida from './TableComida';
import LogoInicio from '../Images/LogoInicio.jpg';


const Comidas = () => {

    const descripcion = useRef()
    const esVegetariano = useRef()
    const id = useRef()
    const [menues, setmenues] = useState([{}]);


    useEffect(() => {
        fetch('http://localhost:8080/menu/getAll').then(
            response => response.json())
            .then(
                data => {
                    setmenues(data.menus);
                }
            )
    }, [menues])

    const _onChangeVegetariano = () => {
        try {
            ; (async () => {
                console.log("_onChangeVegetariano");
                console.log(esVegetariano.current.checked);

            })()
        } catch (error) {
            console.error(error)
        }
    }

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

    const handleSubmit = postData => {

        postData.preventDefault();
        const desc = descripcion.current.value

        console.log(esVegetariano.current.checked);
        console.log(desc);

        let url = 'http://localhost:8080/menu/post';
        let method = 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "esVegetariano": esVegetariano.current.checked,
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
                handleClose();
            })
            .catch(err => {
                console.log(err);
                alert("No Se pudo Ingresar el menu. Complete todos los campos.");
            });

    }

    const handleSubmitUP = updateData => {

        updateData.preventDefault();
        const idMenu = id.current.value
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
            })
            .catch(err => {
                console.log(err);
            });
    }

    const [show, setShow] = useState(false);
    const [showUP, setShowUP] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseUP = () => setShowUP(false);

    return (
        <div className="container m-2">
            <div className="row heading" >
            <div className="col-md-2 align-self-start">
                    <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
                </div>
                <div className="col-md-9 d-flex flex-row-reverse">
                    <div className="linkContainerSecondOption" >
                        <Button variant="default" onClick={handleShow}>
                            <img src={Agregar_Menu_img} className="iconosImgThirdOption" alt ="agregar" />
                        </Button>
                    </div>
                </div>
                <div className="col-md-1 d-flex flex-row-reverse">
                    <NavLink exact to="/Inicio" id="dash" >
                        <div className="linkContainerSecondOption" >
                            <img src={Volver_img} className="iconosImgSecondOption" alt = "volver"/>
                        </div>
                    </NavLink>
                </div>
                <div className="col-md-1" >

                    <Modal show={show} className="my-modal" onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Crear Menu</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="my-modal-form"  >
                                <Form.Group className="mb-3" controlId="descripcion" >
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nuevo menu"
                                        autoFocus
                                        name="descripcion"
                                        ref={descripcion}
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
                                        onChange={_onChangeVegetariano}
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
                <div className="col-md-1" >
                    <Modal show={showUP} className="my-modal" onHide={handleCloseUP}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modificar Menu</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="my-modal-form"  >
                                <Form.Group className="mb-3" controlId="descripcion" >
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control
                                        type="number"
                                        //value={idMenuSeleccionado}
                                        autoFocus
                                        name="id"
                                        ref={id}
                                    />
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nueva Descripción"
                                        autoFocus
                                        name="descripcion"
                                        ref={descripcion}
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
                                        onChange={_onChangeVegetarianoUP}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" variant="outline-primary" onClick={handleSubmitUP}>
                                Modificar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="col-md-1" >

                </div>
            </div>
            <div className="container">
                <table className="table table-striped table-dark table-hover borderTable new" style={{ "paddingTop": "20%" }}>
                    <thead>
                        <tr>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Es Vegetariano</th>
                            <th scope="col">Eliminar</th>
                            <th scope="col">Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menues.map((m,index) =>
                        (
                            <TableComida key={index} menu={m} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Comidas