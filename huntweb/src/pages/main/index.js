import React, { Component } from "react";
import api from "../../services/api"

//esse componente é um componente class, ou seja ele detem a troca de estados se quiser
export default class Main extends Component {
  state = { //state é o objeto que guarda veriaveis que podem alterar o seu estado. Sempre que usarmos uma variavel de estado no método render, o metodo render ficará "escutando" essa variavel, ou seja, toda mudança que tiver na variavel vai ser aplicadaS
    products: [],
  };


  componentDidMount() { //esse metodo é usado   para fazer algo logo que o componente é     exibido em tela, assim que o componente     for carregado, esse metodo carreagará       primeiro e executará a açao
    this.loadProducts();
  } 
  loadProducts = async () => { //quando criamos funções nossas, as funções precisam ser criadas no modelo de arrow function, pois se a criarmos como uma função normal, como por exemplo loadProducats() {}, não poderíamos usar a palavra reservada this, e não conseguiríamos referenciar a classe dentro da função. E quando vamos usar uma função nativa do React, a usamos em named funtion normalmente, um exemplo é componentDidMount() {}.
    const response = await api.get("/products"); //utiliza o metodo get da api

    console.log(response);
    this.setState({products: response.data.docs}); //quando precisamos alterar uma variavel de estado não fazemos da forma normal, necessitamos usar metodos próprios como o setState para o fazer.
  };

  render() {
    return <h1>Quantidad de dados no bd: {this.state.products.length}</h1>
  }
}