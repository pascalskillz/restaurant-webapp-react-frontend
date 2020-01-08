import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import Jumbo from '../components/Jumbo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import '../styles/Main.css'
import '../styles/cart.css';

class Cart extends Component {
  render() {
    return (
      <MyConsumer>
        {({ state }) => (
          <div className='cart-js'>
            <Navbar page='CART' />
            <Jumbo
              src='https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
              alt='Cart Picture'
              text='Your Cart'
            />
            <div class='head'>
              <h2 className='m-heading'>Cart</h2>
            </div>
            <Footer />
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Cart;
