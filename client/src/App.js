import './Css/App.css';
import Login from './Componentes/Login';
import Inicio from './Componentes/Inicio';
import Comidas from './Componentes/Comidas';
import MenuSemanales from './Componentes/MenuSemanales';
import Timeline from './Componentes/Timeline';
import Informes from './Componentes/Informes';
import Graficas from './Componentes/Graficas';
import Horario from './Componentes/Horarios';
import Feedback from './Componentes/Feedback';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch ,Route } from 'react-router-dom';
import React from 'react';
import "reflect-metadata";

const initialState = []

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

function App() {

  const store = configureStore({reducer: rootReducer});
  return (
    <Provider store={store}>
      <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Inicio" component={Inicio}/>
          <Route exact path="/Comidas" component={Comidas}/>
          <Route exact path="/MenuSemanales" component={MenuSemanales}/>
          <Route exact path="/Horarios" component={Horario}/>
          <Route exact path="/Informes" component={Informes}/>
          <Route exact path="/Graficas" component={Graficas}/>
          <Route exact path="/Timeline" component={Timeline}/>
          <Route exact path="/Feedback" component={Feedback}/>
        </Switch>
      </div>
      </Router>
    </Provider>
  );
}

export default App