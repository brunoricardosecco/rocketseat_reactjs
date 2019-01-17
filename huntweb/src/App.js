import React, { Component } from 'react';
import "./styles.css";


import Header from "./components/Header";
import Main from "./pages/main"

//o nome desse componente é componente stateless ou seja, é um componente que não vai trocar de estados, só usamos ele em casos de componentes que não vão trocar de estados. o componente é uma constante
const App = () => (
  <div className="App">
    <Header />
    <Main />
  </div>
);

export default App;
