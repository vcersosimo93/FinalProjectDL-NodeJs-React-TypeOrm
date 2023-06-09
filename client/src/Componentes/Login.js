import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import LogoInicio from '../Images/LogoInicio.jpg';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

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
    window.google.accounts.id.initialize({
      client_id: "292987655880-i0jgdsstnjkhir74hdif5cbnndjlak60.apps.googleusercontent.com",
      callback: handlerCallBackResponse
    });

    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  return (
    <div className="container">

      <div className="row">
        <div className="col align-self-start">
          <img src={LogoInicio} className="imgLogo" alt="LogoDL" />
        </div>
      </div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container tituloApp">
          <h1 className="display-4">Servicio Gastronómico December Labs</h1>
          <p className="lead">Aplicación enfocada en la optimización del servicio gastronómico brindado en la empresa.</p>
        </div>
      </div>
      <div className="card-body p-5 text-center login" style={{ "marginTop": "150px","marginBottom": "50px" }} >
        <h2 className="mb-md-5">Iniciar sesión</h2>
        <div style={{ "paddingLeft": "20%" }} id="signInDiv">
          {userLS &&
            history.push('/Inicio')
          }
        </div>
      </div >
      <NavLink exact to="/Feedback" id="dash" href="#" className="link-light" style={{ "textAlign": "center"}}>
          <div>Presione Aqui Para Realizar Su Feedback.</div>
      </NavLink>
      
    </div >

  );
}

export default Login

