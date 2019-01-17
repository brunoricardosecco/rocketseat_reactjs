import React from 'react';
import Header from "./components/Header";
import Routes from "./routes";
import "./styles.css";

//o nome desse componente é componente stateless ou seja, é um componente que não vai trocar de estados, só usamos ele em casos de componentes que não vão trocar de estados. o componente é uma constante
const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

export default App;
