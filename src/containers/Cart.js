import React, { Component } from 'react';
import { MyConsumer } from '../Context'
// import '../styles/Main.css'
import '../styles/cart.css'

class Cart extends Component {
  render() {
    return (
      <MyConsumer>
        {({ state }) => (
          <div id="">
            <div class="head">
              <h2 className="m-heading">Cart</h2>
            </div>
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Cart;