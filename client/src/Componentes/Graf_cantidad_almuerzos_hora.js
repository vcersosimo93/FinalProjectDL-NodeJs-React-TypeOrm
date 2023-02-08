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

const Graf_cantidad_almuerzos_hora = () => {



  const [Horarios, setHorarios] = useState([{}]);
  const [Pedidos, setPedidos] = useState([{}]);
  let horarios = []

  useEffect(() => {
    fetch(process.env.REACT_APP_LOCALHOST + '/horario/get').then(
      response => response.json())
      .then(
        data => {
          setHorarios(data);
          llenarHorarios();
        }
      )
  }, [Horarios])



  useEffect(() => {
    fetch(process.env.REACT_APP_LOCALHOST + '/pedido/get').then(
      response => response.json())
      .then(
        data => {
          setPedidos(data);
          cantidadPedidosPorHorario();
        }
      )
  }, [Pedidos])


  let cantidadPedidosPorHorario = () => {
    for (let unHorario of horarios) {
      for (let unPedido of Pedidos) {
        if (unPedido.horarioId === unHorario.id) {
          unHorario.cantidad++
        }

      }
    }

  }

  let llenarHorarios = () => {

    for (let unHorario of Horarios) {

      let horario = {
        id: unHorario.id,
        hora: unHorario.hora,
        cantidad: 0
      }

      horarios.push(horario)
    }

  }

  llenarHorarios();


  cantidadPedidosPorHorario();

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
      <h3 className=" justify-content-center tituloInforme">Cantidad almuerzos por hora</h3>
        {Pedidos.length > 0 &&
          <Bar className="grafica divContenido" data={{
            labels: horarios.map(p => (p.hora)),
            datasets: [
              {
                label: 'Cant Almuerzos',
                data: horarios.map(p => (p.cantidad)),
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

export default Graf_cantidad_almuerzos_hora
