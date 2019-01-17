import React, { Component } from "react";
import api from "../../services/api"
import { Link } from "react-router-dom";
import "./styles.css"

//esse componente é um componente class, ou seja ele detem a troca de estados se quiser
export default class Main extends Component {
  state = { //state é o objeto que guarda veriaveis que podem alterar o seu estado. Sempre que usarmos uma variavel de estado no método render, o metodo render ficará "escutando" essa variavel, ou seja, toda mudança que tiver na variavel vai ser aplicadaS
    products: [],
    productInfo: {},
    page: 1,
  };


  componentDidMount() { //esse metodo é usado   para fazer algo logo que o componente é     exibido em tela, assim que o componente     for carregado, esse metodo carreagará       primeiro e executará a açao.
    this.loadProducts(this.state.page);
  } 
  loadProducts = async (page) => { //quando criamos funções nossas, as funções precisam ser criadas no modelo de arrow function, pois se a criarmos como uma função normal, como por exemplo loadProducats() {}, não poderíamos usar a palavra reservada this, e não conseguiríamos referenciar a classe dentro da função. E quando vamos usar uma função nativa do React, a usamos em named funtion normalmente, um exemplo é componentDidMount() {}.
    const response = await api.get(`/products?page=${page}`); //utiliza o metodo get da api

    const { docs, ...productInfo } = response.data;
  
    this.setState({products: docs, productInfo, page}); //quando precisamos alterar uma variavel de estado não fazemos da forma normal, necessitamos usar metodos próprios como o setState para o fazer.
  };

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) {
      return;
    }

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  };
  nextPage = () => {
    const { page, productInfo } = this.state;

    if(page === productInfo.pages) {
      return;
    }

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  render() {//se existir uma variavel de estado dentro do metodo render, o metodo fica escutando essa variavel e caso ela seja alterada, o metodo render é re executado e as alteraçoes internas são efetivadas
    const { products, productInfo, page } = this.state;

    return(
      <div className="product-list">
        {products.map(product => (

          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
         //quando utilizamos um map(), o react pede que adicionemos uma key em cada elemento do map(), por isso o uso do key, map() é como seu fosse um forEach().
        ))}
        <div className="actions">
          <button onClick={this.prevPage}>Anterior</button>
          <p>{page}/{productInfo.pages}</p>
          <button onClick={this.nextPage}>Próximo</button>
        </div>
      </div>
    );
  }
}