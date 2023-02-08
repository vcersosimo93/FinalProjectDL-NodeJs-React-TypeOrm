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


  const [Empleados, setEmpleados] = useState([{}]);
  const [Pedidos, setPedidos] = useState([{}]);
  let empleados = []

  useEffect(() => {
    fetch(process.env.REACT_APP_LOCALHOST + '/empleado/getAll').then(
      response => response.json())
      .then(
        data => {
          setEmpleados(data);
        }
      )
  }, [Empleados])



  useEffect(() => {
    fetch(process.env.REACT_APP_LOCALHOST + '/pedido/get').then(
      response => response.json())
      .then(
        data => {
          setPedidos(data);
        }
      )
  }, [Pedidos])


  let cantidadPedidosPorEmpleado = () => {
    for (let unEmpleado of empleados) {
      for (let unPedido of Pedidos) {
        if (unPedido.empleadoId === unEmpleado.id) {
          unEmpleado.cantidad++
        }

      }
    }

  }





  let llenarNombreEmpleados = () => {

    for (let unEmpleado of Empleados) {

      let empleado = {
        id: unEmpleado.id,
        nombre: unEmpleado.nombre,
        cantidad: 0
      }

      empleados.push(empleado)
    }

  }

  llenarNombreEmpleados();

  cantidadPedidosPorEmpleado();





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
        <h3 className=" justify-content-center tituloInforme">Cantidad de almuerzos por empleados</h3>
        {empleados.length > 0 &&
          <Bar className="grafica divContenido" data={{
            labels: empleados.map(p => (p.nombre)),
            datasets: [
              {
                label: 'Cant Almuerzos',
                data: empleados.map(p => (p.cantidad)),
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
        {empleados.length <= 0 &&

          <p className="col-9 d-flex align-items-center pContenido">No hay información para mostrar.</p>

        }
      </div>
    </div>
  )
}

export default Graf_almuerzo_meses
