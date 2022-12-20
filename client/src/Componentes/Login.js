import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import UserImg from '../Images/iconoPerfil.png';
import LogoInicio from '../Images/LogoInicio.jpg';
import { useHistory } from 'react-router-dom';


function Login() {

  const history = useHistory();

  let [user, setUser] = useState({});
  let userLS = localStorage.getItem("user");

  function handlerCallBackResponse(response) {
    var userObject = jwt_decode(response.credential);
    localStorage.setItem("user", userObject);
    setUser(userObject);
    document.getElementById('signInDiv').hidden = true;
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "292987655880-i0jgdsstnjkhir74hdif5cbnndjlak60.apps.googleusercontent.com",
      callback: handlerCallBackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  return (
    <div className="container">
      <div class="row">
        <div class="col align-self-start">
          <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
        </div>
        <div class="col d-flex align-self-center justify-content-end">
          <img src={UserImg} className="UserImg" alt="User" />
        </div>
      </div>
      <div class="row"> <h2 class="col d-flex justify-content-center textosMenuInicial">Login</h2></div>
      <div style={{ "padding-left": "40%", "padding-top": "5%", }} id="signInDiv"></div>
      {userLS &&
        history.push('/Inicio')
      }
    </div >
  );
}

export default Login

