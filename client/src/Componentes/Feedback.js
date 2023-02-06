import React from 'react';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import LogoInicio from '../Images/LogoInicio.jpg';
import { NavLink } from 'react-router-dom';
import Volver_img from '../Images/Volver.png';


const Feedback = () => {
    const [empleadosTodos, setempleadosTodos] = useState([{}]);
    const comentario = useRef()
    const empleado = useRef()

    useEffect(() => {
        fetch(process.env.REACT_APP_LOCALHOST + '/empleado/getAll').then(
            response => response.json())
            .then(
                data => {
                    setempleadosTodos(data);
                }
            )
    }, [empleadosTodos])

    
    const postFeedback = postData => {

        postData.preventDefault();
        const coment = comentario.current.value
        const persona = empleado.current.value
        let url = process.env.REACT_APP_LOCALHOST + '/feedback/post';
        let method = 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "comentario": coment,
                "empleadoId": persona
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
                <div class="col d-flex flex-row-reverse" style={{ "paddingTop": "2%" }}>
                    <NavLink exact to="/Inicio" id="dash" >
                        <table className="linkContainerSecondOption" >
                            <img src={Volver_img} className="iconosImgSecondOption"/>
                        </table>
                    </NavLink>
                </div>
                <div className="row textosMenuInicial">
                    <div className="card col d-flex justify-content-center" id="informeCinco">
                        <h3 className="col d-flex justify-content-center tituloInforme">Enviar Feedback</h3>
                        <label className="divContenido">Comentario</label>
                        <textarea placeholder="Ingrese su comentario. . . " class="form-control" id="comentario" name="comentario" ref={comentario} rows="3"></textarea>
                        <br></br>
                        <label className="divContenido">Nombre</label>
                        {empleadosTodos.length > 0 &&
                            <select className="form-select divContenido selectblack" aria-label="Default select example" id="empleados" name="empleado" ref={empleado}>
                                <option value="">Seleccione su nombre . . .</option>
                                {empleadosTodos.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                            </select>
                        }
                        {empleadosTodos.length <= 0 &&
                            <p className="col-9 d-flex align-items-center pContenido marcaAgua">No hay nombres habilitados en el sistema para realizar feedback.</p>
                        }
                        {empleadosTodos.length <= 0 &&
                            <select className="form-select divContenido" aria-label="Default select example" id="empleados" name="empleado" ref={empleado} hidden="hidden">
                                <option value="">Seleccione su nombre . . .</option>
                            </select>}
                        <br></br>
                        <button type="button" onClick={postFeedback} className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"> Enviar Feedback</button><br></br>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback;


