import React from 'react';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import LogoInicio from '../Images/LogoInicio.jpg';
import { NavLink } from 'react-router-dom';
import Volver_img from '../Images/Volver.png';


const Feedback = () => {
    const comentario = useRef()
   
    const postFeedback = postData => {

        postData.preventDefault();
        const coment = comentario.current.value
        let url = process.env.REACT_APP_LOCALHOST + '/feedback/post';
        let method = 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "comentario": coment
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
                alert("Se ingreso correctamente el feedback.");
            })
            .catch(err => {
                console.log(err);
                alert("No se pudo Ingresar el feedback.");
            });

    }

    return (
        <div className="container m-2">
            <div className="row heading" >
                <div className="col d-flex">
                    <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
                </div>
                <div className="col d-flex flex-row-reverse" style={{ "paddingTop": "2%" }}>
                    <NavLink exact to="/Inicio" id="dash" >
                        <div className="linkContainerSecondOption" >
                            <img src={Volver_img} alt="volverImg" className="iconosImgSecondOption"/>
                        </div>
                    </NavLink>
                </div>
                <div className="row textosMenuInicial">
                    <div className="card col d-flex justify-content-center" id="informeCinco">
                        <h3 className="col d-flex justify-content-center tituloInforme">Enviar Feedback</h3>
                        <label className="divContenido">Comentario</label>
                        <textarea placeholder="Ingrese su comentario. . . " className="form-control" id="comentario" name="comentario" ref={comentario} rows="3"></textarea>
                        <br></br>
                        <button type="button" onClick={postFeedback} className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Enviar Feedback</button><br></br>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback;


