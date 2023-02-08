import React from 'react';

import Volver_img from '../Images/Volver.png';
import LogoInicio from '../Images/LogoInicio.jpg';
import { NavLink } from 'react-router-dom';
import GrafAlmuerzoEmpleados from './GrafAlmuerzoEmpleados.js';
import GrafAlmuerzoMes from './GrafAlmuerzoMes.js';
import GrafCantidadAlmuerzosHora from './GrafCantidadAlmuerzosHora.js'
import GrafAlmPromedio  from './GrafAlmPromedio.js'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Graficas = () => {
    return (
        <div className="container m-2">
            <div className="row heading" >
                <div className="col d-flex">
                    <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
                </div>
                <div className="col d-flex flex-row-reverse" style={{ "paddingTop": "2%" }}>
                    <NavLink exact to="/Inicio" id="dash" >
                        <div className="linkContainerSecondOption" >
                            <img src={Volver_img} alt="volverImg" className="iconosImgSecondOption" />
                        </div>
                    </NavLink>
                </div>
                <h2 className="col-md-12 d-flex justify-content-center textosMenuInicial">Gráficas</h2>
                <div className="row">
                        <GrafAlmuerzoEmpleados />
                        <GrafAlmuerzoMes/>
                        <GrafCantidadAlmuerzosHora/>
                        <GrafAlmPromedio/>
                </div>
            </div>
        </div>
    )
};


export default Graficas


