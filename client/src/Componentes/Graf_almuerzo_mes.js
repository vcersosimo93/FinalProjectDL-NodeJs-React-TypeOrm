import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
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

const Graf_almuerzo_meses = () => {


    const [Pedidos, setPedidos] = useState([{}]);
    let contadorPedidosEne = 0; let contadorPedidosFeb = 0; let contadorPedidosMar = 0; let contadorPedidosAbr = 0; let contadorPedidosMay = 0; let contadorPedidosJun = 0;
    let contadorPedidosJul = 0; let contadorPedidosAgo = 0; let contadorPedidosSet = 0; let contadorPedidosOct = 0; let contadorPedidosNov = 0; let contadorPedidosDec = 0;

    useEffect(() => {
        fetch('http://localhost:8080/pedido/get').then(
            response => response.json())
            .then(
                data => {
                    setPedidos(data);
                    pedidosPorMeses();
                }
            )
    }, [Pedidos])





    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return month;
    }

    let cantidadPedidosPorMes = (fecha) => {

        if (fecha == '01') {
            contadorPedidosEne++;
        } else if (fecha == '02') {
            contadorPedidosFeb++;
        } else if (fecha == '03') {
            contadorPedidosMar++;
        } else if (fecha == '04') {
            contadorPedidosAbr++;
        } else if (fecha == '05') {
            contadorPedidosMay++;
        } else if (fecha == '06') {
            contadorPedidosJun++;
        } else if (fecha == '07') {
            contadorPedidosJul++;
        } else if (fecha == '08') {
            contadorPedidosAgo++;
        } else if (fecha == '09') {
            contadorPedidosSet++;
        } else if (fecha == '10') {
            contadorPedidosOct++;
        } else if (fecha == '11') {
            contadorPedidosNov++;
        } else if (fecha == '12') {
            contadorPedidosDec++;
        }
    }

    const pedidosPorMeses = () => {

        for (let i = 0; i < Pedidos.length; i++) {

            const fecha = formatDate(Pedidos[i].fechaSolicitud);

            cantidadPedidosPorMes(fecha)

        }


    }

    pedidosPorMeses();


    let cantidadMenus = [
        { id: 1, cantidad: contadorPedidosEne },
        { id: 2, cantidad: contadorPedidosFeb },
        { id: 3, cantidad: contadorPedidosMar },
        { id: 4, cantidad: contadorPedidosAbr },
        { id: 5, cantidad: contadorPedidosMay },
        { id: 6, cantidad: contadorPedidosJun },
        { id: 7, cantidad: contadorPedidosJul },
        { id: 8, cantidad: contadorPedidosAgo },
        { id: 9, cantidad: contadorPedidosSet },
        { id: 10, cantidad: contadorPedidosOct },
        { id: 11, cantidad: contadorPedidosNov },
        { id: 12, cantidad: contadorPedidosDec }
    ]






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
  return (
    <div className="">
    <h3 className="col d-flex justify-content-center divContenido">Almuerzos por mes</h3>
    <Bar className="grafica divContenido" data={{
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
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
    }} options={options} />
    </div>
  )
}

export default Graf_almuerzo_meses
