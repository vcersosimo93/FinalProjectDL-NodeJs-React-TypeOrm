import React from 'react';
import LogoInicio from '../Images/LogoInicio.jpg';
import UserImg from '../Images/iconoPerfil.png';
import Timeline from '../Images/TimelineImg.png';
import Comidas from '../Images/ComidasImg.png';
import Informes from '../Images/InformesImg.png';
import Graficas from '../Images/GraficasImg.png';
import MenuSemanales from '../Images/pedidoImg.png';
import { NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Inicio = () => {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const usuario = localStorage.getItem("user"); //Quise guardar usuario para ver nombre e imagen una vez logueado.
    
    function cerrarSesion(){
        localStorage.removeItem("user");
        history.push("/Login")
    }

    return (
        <div className="container">
            <div className="row " >
                <div className="col align-self-start">
                    <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
                </div>   
                <div className="col d-flex align-self-center justify-content-end">
                    <img src={UserImg} onClick={handleShow} className="UserImg" alt="User" />
                </div>
            </div>
            <Modal show={show} className="my-modal" onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Cerrar Sesión</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Button variant="outline-primary" onClick={cerrarSesion}>
                        Cerrar sesión
                    </Button>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    </Modal.Footer>
            </Modal>

            <div className="row " style={{"paddingTop":"20%"}}>
                <div className="col d-flex justify-content-center">
                    <NavLink  exact to="/Comidas"  id="dash" >
                        <div className="linkContainer" >                    
                            <img src={Comidas} className="iconosImg" alt="User" />
                        </div>
                    </NavLink>
                </div>
                <div className="col d-flex justify-content-center">
                    <NavLink  exact to="/MenuSemanales"  id="dash" >
                        <div className="linkContainer" >                    
                            <img src={MenuSemanales} className="iconosImg" alt="User"/>
                        </div>
                    </NavLink>
                </div>
                <div className="col d-flex justify-content-center">
                    <NavLink exact to="/Timeline"  id="dash" >
                        <div className="linkContainer" >                    
                            <img src={Timeline} className="iconosImg" alt="User" />
                        </div>
                    </NavLink>
                </div>
                <div className="col d-flex justify-content-center">
                    <NavLink exact to="/Informes"  id="dash" >
                        <div className="linkContainer" >                    
                            <img src={Informes} className="iconosImg" alt="User" />
                        </div>
                    </NavLink>    
                </div>
                <div className="col d-flex justify-content-center">
                    <NavLink exact to="/Graficas"  id="dash" >
                        <div className="linkContainer" >                    
                            <img src={Graficas} className="iconosImg" alt="User" />
                        </div>
                    </NavLink>    
                </div>
            </div>
            <div className="row textosMenuInicial">
                    <h2 className="col d-flex justify-content-center">Comidas</h2>
                    <h2 className="col d-flex justify-content-center">Menu Semanales</h2>
                    <h2 className="col d-flex justify-content-center">Iniciar servicio</h2> 
                    <h2 className="col d-flex justify-content-center">Informes</h2>
                    <h2 className="col d-flex justify-content-center">Graficas</h2>
            </div>
        </div>
    )
}

export default Inicio


/*
COMENTARIO NOE :
INTENTO PARA VER IMAGEN Y USUARIO A AGREGAR ANTES DEL MODAL
            <div class="col d-flex align-self-center justify-content-end" id="loginGoogle">
                {
                    usuario &&
                    <div hidden class="col d-flex align-self-center" id="loginGoogle">
                        <div>
                            <img src={usuario.picture} alt="googleUserPic" class="col d-flex justify-content-center tituloInforme"></img>
                        </div>
                        <div>
                            <h2 class="col d-flex justify-content-center tituloUsuarioLogueado" >{usuario.name}</h2>
                        </div>
                    </div>
                }
            </div>
 */