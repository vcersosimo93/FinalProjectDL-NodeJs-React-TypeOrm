import React from 'react';
import { Bar } from 'react-chartjs-2';
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

let cantidadMenus = [
    { id: 1, cantidad: "10" },
    { id: 2, cantidad: "5" },
    { id: 4, cantidad: "100" },
    { id: 5, cantidad: "50" },
    { id: 6, cantidad: "60" },
    { id: 7, cantidad: "7" },
    { id: 8, cantidad: "5" },
    { id: 9, cantidad: "5" },
    { id: 10, cantidad: "0" },
    { id: 11, cantidad: "0" },
    { id: 12, cantidad: "10" }
]

const Graficas = () => {
    return (
        <div className="container">
            <h2 class="col d-flex justify-content-center textosMenuInicial">Graficas</h2>
            <div class="row textosMenuInicial">
                <div class="card col d-flex justify-content-center">
                    <h3 class="col d-flex justify-content-center divContenido">Almuerzos por mes</h3>
                    <Bar className="grafica" data={{
                         labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
                        datasets: [
                            {
                                label: 'Cant Almuerzos',
                                data: cantidadMenus.map(p => (p.cantidad)),
                                backgroundColor: [
                                    'black',
                                    'black',
                                    'black',
                                    'black',
                                ],
                                borderColor: [
                                    'black',
                                    'black',
                                    'black',
                                    'black',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }} options={options} class="divContenido"/>
                </div>
                <div class="col d-flex justify-content-center">
                    <h3 class="col d-flex justify-content-center">Promedio de Almuerzos por mes</h3>
                </div>
            </div>
            <div class="row textosMenuInicial">
                <div class="col d-flex justify-content-center">
                    <h3 class="col d-flex justify-content-center">Pedidos por personas</h3>
                </div>
                <div class="col d-flex justify-content-center">
                    <h3 class="col d-flex justify-content-center">Picos de hora</h3>
                </div>
            </div>
        </div>
    )
};


export default Graficas




/*
OTRO EJEMPLO
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

export const data = {
    meses,
    datasets: [
      {
        label: 'Dataset 1',
        data:  cantidadMenus.map(h => <option key={h.id} value={h.id}>{h.cantidad}</option>),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: cantidadMenus.map(h => <option key={h.id} value={h.id}>{h.cantidad}</option>),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

const Graficas = () => {
    return (
        <div className="container">
            <h2 class="col d-flex justify-content-center textosMenuInicial">Graficas</h2>
            <div class="row textosMenuInicial">
                <div class="card col d-flex justify-content-center">
                    <h3 class="col d-flex justify-content-center divContenido">Almuerzos por mes</h3>
                    <Bar options={options} data={data} class="divContenido"/>;
                </div>
                <div class="col d-flex justify-content-center">
                    <h3 class="col d-flex justify-content-center">Cantidad de Almuerzos por mes</h3>
                </div>
            </div>
            <div class="row textosMenuInicial">
                <div class="col d-flex justify-content-center">
                    <h3 class="col d-flex justify-content-center">Pedidos por personas</h3>
                </div>
                <div class="col d-flex justify-content-center">
                    <h3 class="col d-flex justify-content-center">Picos de hora</h3>
                </div>
            </div>
        </div>
    )
};


export default Graficas








*/