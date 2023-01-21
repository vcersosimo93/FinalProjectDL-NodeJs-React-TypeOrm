import React from 'react';
import { Bar } from 'react-chartjs-2';
import Volver_img from '../Images/Volver.png';
import LogoInicio from '../Images/LogoInicio.jpg';
import { NavLink } from 'react-router-dom';
import Graf_almuerzo_empleados from './Graf_almuerzo_empleados';
import Graf_almuerzo_mes from './Graf_almuerzo_mes';
import Graf_cantidad_almuerzos_hora from './Graf_cantidad_almuerzos_hora'
import Graf_alm_promedio  from './Graf_alm_promedio'

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

const options = {
    indexAxis: 'x',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            //text: 'Chart.js Horizontal Bar Chart',
        },
    },
};



const Graficas = () => {
    return (
        <div className="container m-2">
            <div className="row heading" >
                <div className="col d-flex">
                    <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
                </div>
                <div class="col d-flex flex-row-reverse" style={{ "paddingTop": "2%" }}>
                    <NavLink exact to="/Inicio" id="dash" >
                        <table className="linkContainerSecondOption" >
                            <img src={Volver_img} className="iconosImgSecondOption" />
                        </table>
                    </NavLink>
                </div>
                <h2 className="col-md-12 d-flex justify-content-center textosMenuInicial">Gráficas</h2>
                <div className="row">
                        <Graf_almuerzo_empleados />
                        <Graf_almuerzo_mes/>
                        <Graf_cantidad_almuerzos_hora/>
                        <Graf_alm_promedio/>
                </div>
            </div>
        </div>
    )
};


export default Graficas


