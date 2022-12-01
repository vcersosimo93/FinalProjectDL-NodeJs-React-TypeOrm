import React from 'react';
import LogoInicio from '../Images/LogoInicio.jpg';
import UserImg from '../Images/iconoPerfil.png';
import { NavLink } from 'react-router-dom';


const Menu = () => {
    return (
        <div class="row textosMenuInicial">
            <h2 class="col d-flex justify-content-center">Alta Menu</h2>
            <legend>Es Vegetariano ?</legend>
            <input type="radio" id="Si" name="Es Vegetariano ?" value="Si" checked></input>
            <label for="Si">Si</label><br></br>
            <input type="radio" id="No" name="Es Vegetariano ?" value="No" checked></input>
            <label for="No">No</label><br></br>
            <legend>Descripcion</legend>
            <input type="text" id="descripMenu" name="descripMenu" placeholder="..." title="Este Campo es obligatorio." required></input>

        </div>
    )
}

export default Menu;


