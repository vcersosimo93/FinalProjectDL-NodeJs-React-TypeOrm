import React from 'react';
import LogoInicio from '../Images/LogoInicio.jpg';
import UserImg from '../Images/iconoPerfil.png';
import altaMenuImg from '../Images/mas.png';
import cancelMenuImg from '../Images/cancel.png';
import Filtro_Comidas_img from '../Images/Filtro_Comidas.png';
import Agregar_Menu_img from '../Images/Agregar_Menu.png';
import Volver_img from '../Images/Volver.png';
import Lapiz_Comidas_Menu_img from '../Images/Lapiz_Comidas_Menu.png'; 
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import flechaDer from '../Images/flechaDer.png';
import flechaIzq from '../Images/flechaIzq.png';
import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';

const Comidas = () => {


    const descripcionMenu = useRef(null)
    const vegetarianoMenu = useRef(null)

    const crearMenu = async e => {
        
        const desc = descripcionMenu.current.value
        const veg = vegetarianoMenu.current.value
        

    };
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let pedidosComidas = [
        {id : 1,nombre: "Banana"},
        {id : 2, nombre: "Frutilla"},
        {id : 3, nombre: "Manzana"}
    ]
    
    return (



        <div className="container m-2">
        <div class="row " >
            <div class="col-md-1 ">
                 <table className="linkContainerSecondOption" >  
                     <img src={Filtro_Comidas_img} className="iconosImgSecondOption" />
                 </table>
            </div>   
            <div class="col-md-1" >

            <table className="linkContainerSecondOption" >
                <Button variant="default" onClick={handleShow}>
                    <img src={Agregar_Menu_img} className="iconosImgThirdOption" />
                </Button>
            </table>

                <Modal show={show} className="my-modal" onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Crear Menu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form className="my-modal-form" >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nuevo menu"
                            autoFocus
                            ref={descripcionMenu}
                        />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="Vegetariano"
                            ref={vegetarianoMenu}
                        />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="outline-primary" onHandleClick={crearMenu}>
                        Crear
                    </Button>
                    </Modal.Footer>
                </Modal>
             </div>
             
             <div class="col-md-5 " >
                 <div class="input-group">
                     <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                     <button type="button" class="btn btn-dark">Buscar</button>
                 </div>
             </div>
             <div class="col-md-5 d-flex flex-row-reverse">
                 <NavLink exact to="/Inicio"  id="dash" >
                     <table className="linkContainerSecondOption" > 
                         <img src={Volver_img} className="iconosImgSecondOption" />
                     </table>
                 </NavLink> 
             </div>
         </div>

         <div className="container">  
           
            <div className="row " style={{"paddingTop":"20%"}}>
                    {pedidosComidas.map((pedidosComidas) =>
                    (
                    <div>
                        <p className="itemTimelineComidas" key={pedidosComidas.id}><img src={Volver_img}/> <img src={Lapiz_Comidas_Menu_img}/> {pedidosComidas.nombre} </p>
                    </div>
                    ))}
            </div>        
        </div>
         
     </div>


        /* 

        ----LO QUE HIZO NOE-----

        
        <div className="container">

            <div class="row " >
                <div class="col align-self-start">
                    <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
                </div>   
                
                <div class="col d-flex align-self-center justify-content-end">
                    <img src={UserImg} className="UserImg" alt="User" />
                </div>
                <NavLink  exact to="/Menu"  id="dash" >
                        <div class="col d-flex align-self-center justify-content-end">
                            <img src={altaMenuImg} className="userImg" alt="User" />
                        </div>

                </NavLink>
                <div class="col d-flex align-self-center justify-content-end">
                            <img src={cancelMenuImg} className="userImg" alt="User" />
                        </div>
            </div>

                    <NavLink className="linkMenu" exact to="./Comidas"  id="dash" >
                        <table className="linkContainer" >                    
                            <img src={Filtro_Comidas} className="Filtro_Comidas" />
                        </table>
                        <table className="linkContainer" >                    
                            <img src={Filtro_Comidas} className="Filtro_Comidas" />
                        </table>
                    </NavLink>
                </div>*/

    )
}

export default Comidas