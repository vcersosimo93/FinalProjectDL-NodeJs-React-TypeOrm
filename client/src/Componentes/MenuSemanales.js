import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Volver_img from '../Images/Volver.png';
import LogoInicio from '../Images/LogoInicio.jpg';
import { NavLink } from 'react-router-dom';


const MenuSemanales = () => {

    const [menuesGet, setmenuesGet] = useState([{}]);
    const [menues, setmenues] = useState();
    const menu = useRef()
    const fechaSeleccionada = useRef()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch('http://localhost:8080/menu/getAll').then(
            response => response.json())
            .then(
                data => {
                    setmenuesGet(data.menus);
                }
            )
    }, [menuesGet])

    const _onHandleSeleccionMenus = (e) =>{
       
        let value = Array.from(e.target.selectedOptions, option => option.value);
        //console.log(value)
        setmenues(value);

        console.log(menues)
        
    }


    const postearOpcionMenu = menuOpcionData => {

        menuOpcionData.preventDefault();
        const menuSelecc = menues
        const fechaAPublicar = fechaSeleccionada.current.value
        let reaccionId=1;
        let url = 'http://localhost:8080/menuOpcionesFecha/post'
        let method = 'POST'

        for (let menu of menuSelecc) {
            console.log(reaccionId);

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "menu": menu,
                    "fechaAPublicar": fechaAPublicar,
                    "reaccion": reaccionId
                })
            }).then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error('Creating or editing a post failed!');
                    }}).then(resData => {
                    handleShow();})
                .catch(err => {
                    console.log(err);
                });
                reaccionId++;
        }
    }

    const cerrarModal= ()=>{
        handleClose();
    }

    return (
        <div className="container m-2">
            <div className="row heading" >
            <div className="col-md-1 ">
                    <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
                </div>
                <div className="col-md-11 d-flex flex-row-reverse">
                    <NavLink exact to="/Inicio" id="dash" >
                        <div className="linkContainerSecondOption" >
                            <img src={Volver_img} className="iconosImgSecondOption" />
                        </div>
                    </NavLink>
                </div>
                <h2 className="col d-flex justify-content-center textosMenuInicial">Menu Programados</h2>
                <div className="row textosMenuInicial">
                    <form action="/button-submit" method="POST" className="card col d-flex justify-content-center">
                        <label className="divContenido">Seleccionar Las opciones de Pedidos a elaborar.</label>
                        <br></br>
                        <label  className="divContenido">Fecha Publicación. Día habil previo a la elaboración</label>
                        <input placeholder="Seleccionar fecha" type="date" className="form-control" id="fechaAlmuerzo" ref={fechaSeleccionada}></input>
                        <br></br>
                        <select aria-label="Default select example" id="pedido" className="selectpicker" name="Menu" multiple data-live-search="true" ref={menu} onChange={_onHandleSeleccionMenus}>
                            {menuesGet.map((h,index) => <option key={index} value={h.id} >{h.descripcion} </option>)}
                        </select><br></br>
                        <button type="submit" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off" onClick={postearOpcionMenu}> Enviar Opciones</button><br></br>
                    </form>
                </div>
                <Modal show={show} className="my-modal" onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Guardado de Opciones Menu</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="my-modal-form"  >
                                <Form.Group className="mb-3" controlId="Confirmar Guardado." >
                                    <Form.Label>Se ha guardado correctamente las opciones de menus seleccionados para publicar en la app de mensajería en la fecha seleccionada.</Form.Label>
                                    <Form.Label>Siga eligiendo los menú para completar todos los días de la semana.</Form.Label>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" variant="outline-primary" onClick={cerrarModal}  >
                                Ok, continuar Eligiendo.
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        </div>
    )
}

export default MenuSemanales