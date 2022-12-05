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
import { useEffect } from 'react';


const Comidas = () => {


    const descripcion = useRef()
    const esVegetariano = useRef()
    let [menues, setmenues] = useState([]);

    let menuesAMostrar = []

    let [vege,setveg] = useState("");

    useEffect(() =>{
        fetch('http://localhost:8080/menu/getAll')
        .then(response => response.json()) 
        .then((data) => {
        setmenues(data.data);
     })
      }, [])
    

    const _onChangeVegetariano = () =>{
        try {
          ;(async () => {
            console.log("_onChangeVegetariano");
            console.log(esVegetariano.current.checked);
            setveg = esVegetariano

          })()
        } catch (error) {
          console.error(error)
        }
    }
   
    const handleSubmit = postData => {

        postData.preventDefault();


        const desc = descripcion.current.value

        /* 
        let veget

        if(vege === 'on'){
            veget = true
        }else{
            veget = false
        }*/

        
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
            const post = {
            esVegetariano: resData.post.esVegetariano,
            descipcion: resData.post.descipcion
            };
        })
        .catch(err => {
            console.log(err);
        });

        

/* 
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "esVegetariano": vege,
        "descripcion": desc
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/menu/post", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));*/
 
    }

    
    
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
                    {menues.map((menu) =>
                    (
                    <div>
                        <p className="itemTimelineComidas" key={menu.id}><img src={Volver_img}/> <img src={Lapiz_Comidas_Menu_img}/> {menu.descipcion} </p>
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