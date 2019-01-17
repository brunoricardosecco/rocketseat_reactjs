import React, { Component } from "react";
import "./styles.css"
import api from "../../services/api"

//esse componente é um componente class, ou seja ele detem a troca de estados se quiser
export default class Main extends Component {
  state = { //state é o objeto que guarda veriaveis que podem alterar o seu estado. Sempre que usarmos uma variavel de estado no método render, o metodo render ficará "escutando" essa variavel, ou seja, toda mudança que tiver na variavel vai ser aplicadaS
    products: [],
  };


  componentDidMount() { //esse metodo é usado   para fazer algo logo que o componente é     exibido em tela, assim que o componente     for carregado, esse metodo carreagará       primeiro e executará a açao.
    this.loadProducts();
  } 
  loadProducts = async () => { //quando criamos funções nossas, as funções precisam ser criadas no modelo de arrow function, pois se a criarmos como uma função normal, como por exemplo loadProducats() {}, não poderíamos usar a palavra reservada this, e não conseguiríamos referenciar a classe dentro da função. E quando vamos usar uma função nativa do React, a usamos em named funtion normalmente, um exemplo é componentDidMount() {}.
    const response = await api.get("/products"); //utiliza o metodo get da api

    console.log(response);
    this.setState({products: response.data.docs}); //quando precisamos alterar uma variavel de estado não fazemos da forma normal, necessitamos usar metodos próprios como o setState para o fazer.
  };

  render() {//se existir uma variavel de estado dentro do metodo render, o metodo fica escutando essa variavel e caso ela seja alterada, o metodo render é re executado e as alteraçoes internas são efetivadas
    const { products } = this.state;

    return(
      <div className="product-list">
        {products.map(product => (

          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <a href="">Acessar</a>
          </article>
         //quando utilizamos um map(), o react pede que adicionemos uma key em cada elemento do map(), por isso o uso do key, map() é como seu fosse um forEach().
        ))}
        <div className="actions">
          <button>Anterior</button>
          <button>Próximo</button>
        </div>
      </div>
    );
  }
}