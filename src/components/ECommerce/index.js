import { Puff } from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';
import { Component } from 'react';
import Cookies from 'js-cookie';
import ECommerceProduct from '../ECommerceProduct';
import './index.css';

const apiStatusContrains = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
};

class ECommerce extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusContrains.initial,
    userInput: '',
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    this.setState({ apiStatus: apiStatusContrains.inProgress });
    const api = 'https://backend-31397df7x-hemanth-pallapothus-projects.vercel.app/products/ASC';
    const options = {
      method: 'GET',
    };

    const response = await fetch(api, options);
    if (response.ok === true) {
      this.setState({ apiStatus: apiStatusContrains.success });
      const data = await response.json();
      const jsonData = data.map((eachItem) => ({
        productId: eachItem.Product_id,
        name: eachItem.Name,
        price: eachItem.Price,
        category: eachItem.Category,
        stock: eachItem.Stock,
      }));
      this.setState({ productsList: jsonData });
    } else {
      this.setState({ apiStatus: apiStatusContrains.failure });
    }
  };

  onChangeInput = (event) => {
    this.setState({ userInput: event.target.value });
  };

  renderSuccessView = () => {
    const { productsList, userInput } = this.state;
    const filteredProductsList = productsList.filter(
      (eachItem) =>
        eachItem.name.toLowerCase().includes(userInput.toLowerCase()) ||
        eachItem.category.toLowerCase().includes(userInput.toLowerCase()) ||
        eachItem.price.toString().includes(userInput) ||
        eachItem.stock.toString().includes(userInput)
    );
    return (
      <div className='bg-container'>
        <ul className='products-container'>
          {filteredProductsList.map((eachItem) => (
            <ECommerceProduct key={eachItem.productId} productDetails={eachItem} />
          ))}
        </ul>
        <form className='fron-container'>
          <input
            onChange={this.onChangeInput}
            type='text'
            placeholder='Enter Product Name'
            className='input-container'
          />
        </form>
      </div>
    );
  };

  renderInProgressView = () => (
    <div className='inprogress-view'>
      <Puff type='Rings' color='#ffffff' height={50} width={50} />
    </div>
  );

  renderFailureView = () => (
    <div className='failure-view'>
      <h1>404</h1>
      <h1>Oops! Page not found</h1>
    </div>
  );

  render() {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken === undefined) {
      return <Redirect to='/login' />;
    }

    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusContrains.success:
        return this.renderSuccessView();
      case apiStatusContrains.inProgress:
        return this.renderInProgressView();
      case apiStatusContrains.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  }
}

export default ECommerce;