import React from 'react';
import { useState } from 'react';

let menu = [
    { id: 1, nombreMenu: "Bondiola" },
    { id: 2, nombreMenu: "Gramajo" },
    { id: 3, nombreMenu: "Milanesa" },
    { id: 4, nombreMenu: "Tortilla" },
    { id: 5, nombreMenu: "Chivito" },
    { id: 6, nombreMenu: "Ensalada" }
]

const MenuSemanales = () => {

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    return (
        <div className="container">
            <h2 class="col d-flex justify-content-center textosMenuInicial">Pedidos</h2>
            <div class="row textosMenuInicial">
                <form action="/button-submit" method="POST" class="card col d-flex justify-content-center">
                    <label for="pedido" class="divContenido">Seleccionar opciones de Pedidos a realizar el {date}</label>
                    <select aria-label="Default select example" id="pedido" class="selectpicker" name="Menu" multiple data-live-search="true">
                        {menu.map(h => <option key={h.id} value={h.nombreMenu} >{h.nombreMenu} </option>)}
                    </select><br></br>
                    <button type="submit" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"> Enviar Opciones</button><br></br>
                </form>
            </div>
        </div>
    )
}

export default MenuSemanales