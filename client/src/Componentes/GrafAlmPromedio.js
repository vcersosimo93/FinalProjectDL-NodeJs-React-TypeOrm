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

const GrafAlmPromedio = () => {


    const [Pedidos, setPedidos] = useState([{}]);

    let contador = 0;
    let anos = [];
    let arrayAnosMetodo = [];
    let contadorPedidosEne = 0; let contadorPedidosFeb = 0; let contadorPedidosMar = 0; let contadorPedidosAbr = 0; let contadorPedidosMay = 0; let contadorPedidosJun = 0;
    let contadorPedidosJul = 0; let contadorPedidosAgo = 0; let contadorPedidosSet = 0; let contadorPedidosOct = 0; let contadorPedidosNov = 0; let contadorPedidosDec = 0;

    useEffect(() => {
        fetch(process.env.REACT_APP_LOCALHOST + '/pedido/get').then(
            response => response.json())
            .then(
                data => {
                    setPedidos(data);
                    pedidosPorMeses();
                }
            )
    }, [Pedidos])


    const formatDateToWeek = (date) => {
        let d = new Date(date);
        let anio = d.getFullYear();
        let year = new Date(d.getFullYear(), 0, 1);
        let numberOfDays = Math.floor((d - year) / (24 * 60 * 60 * 1000));
        let week = (Math.ceil((d.getDay() + 1 + numberOfDays) / 7) - 1).toString();

        if (week.length < 2) {
            week = "0" + week;
        }

        return [anio];
    }

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate()

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return month;
    }


    const contadorAnos = () => {
        for (let unPedido of Pedidos) {
            let fechaPedido = formatDateToWeek(unPedido.fechaSolicitud);

            let ano = {
                ano: fechaPedido[0]
            }

            anos.push(ano)

        }



    }
    contadorAnos();


    const contarAnos = () => {

        //let contador = 0;

        for (let unAnos of anos) {

            let existe = containsObject(unAnos, arrayAnosMetodo);

            if(!existe){
                let arrayAnosMetodoObjeto = {
                    ano: unAnos.ano
                }
                arrayAnosMetodo.push(arrayAnosMetodoObjeto)
                contador++;
            }
        }
    }


    contarAnos();

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].ano === obj.ano) {
                return true;
            }
        }
    
        return false;
    }




    let cantidadPedidosPorMes = (fecha) => {

        if (fecha === '01') {
            contadorPedidosEne++;
        } else if (fecha === '02') {
            contadorPedidosFeb++;
        } else if (fecha === '03') {
            contadorPedidosMar++;
        } else if (fecha === '04') {
            contadorPedidosAbr++;
        } else if (fecha === '05') {
            contadorPedidosMay++;
        } else if (fecha === '06') {
            contadorPedidosJun++;
        } else if (fecha === '07') {
            contadorPedidosJul++;
        } else if (fecha === '08') {
            contadorPedidosAgo++;
        } else if (fecha === '09') {
            contadorPedidosSet++;
        } else if (fecha === '10') {
            contadorPedidosOct++;
        } else if (fecha === '11') {
            contadorPedidosNov++;
        } else if (fecha === '12') {
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
        { id: 1, cantidad: (contadorPedidosEne/contador) },
        { id: 2, cantidad: (contadorPedidosFeb/contador) },
        { id: 3, cantidad: (contadorPedidosMar/contador) },
        { id: 4, cantidad: (contadorPedidosAbr/contador) },
        { id: 5, cantidad: (contadorPedidosMay/contador) },
        { id: 6, cantidad: (contadorPedidosJun/contador) },
        { id: 7, cantidad: (contadorPedidosJul/contador) },
        { id: 8, cantidad: (contadorPedidosAgo/contador) },
        { id: 9, cantidad: (contadorPedidosSet/contador) },
        { id: 10, cantidad: (contadorPedidosOct/contador) },
        { id: 11, cantidad: (contadorPedidosNov/contador) },
        { id: 12, cantidad: (contadorPedidosDec/contador) }
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

        <div className="row textosMenuInicial">
            <div className=" card col d-flex justify-content-center">
                <h3 className=" justify-content-center tituloInforme">Promedio almuerzos por mes</h3>
                {Pedidos.length > 0 &&
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
                }
                {Pedidos.length <= 0 &&

                    <p className="col-9 d-flex align-items-center pContenido">No hay información para mostrar</p>

                }
            </div>
        </div>
    )
}

export default GrafAlmPromedio
