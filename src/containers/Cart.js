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
          <div className='cart-js top'>
            <Navbar page='CART' />
            <Jumbo
              src='https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
              alt='Cart Picture'
              text='Your Cart'
            />
            {/* mycart start*/}
            <div class='head'>
              <h2 className='m-heading'>Cart</h2>
            </div>
            <div class="cart-item d-md-flex justify-content-between"><span class="remove-item"><i class="fa fa-times"></i></span>
        <div class="px-3 my-3">
            <a class="cart-item-product" href="#">
                <div class="cart-item-product-thumb"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Product"/></div>
                <div class="cart-item-product-info">
                    <h4 class="cart-item-product-title">Canon EOS M50 Mirrorless Camera</h4><span><strong>Type:</strong> Mirrorless</span><span><strong>Color:</strong> Black</span>
                </div>
            </a>
        </div>
            <div class="px-3 my-3 text-center">
            <div class="cart-item-label">Quantity</div>
            <div class="count-input">
                <select class="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </select>
            </div>
        </div>
        <div class="px-3 my-3 text-center">
            <div class="cart-item-label">Subtotal</div><span class="text-xl font-weight-medium">$910.00</span>
        </div>
        <div class="px-3 my-3 text-center">
            <div class="cart-item-label">Discount</div><span class="text-xl font-weight-medium">$35.00</span>
        </div>
        
        </div>
        <div class="cart-item d-md-flex justify-content-between"><span class="remove-item"><i class="fa fa-times"></i></span>
        <div class="px-3 my-3">
            <a class="cart-item-product" href="#">
                <div class="cart-item-product-thumb"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Product"/></div>
                <div class="cart-item-product-info">
                    <h4 class="cart-item-product-title">Apple iPhone X 256 GB Space Gray</h4><span><strong>Memory:</strong> 256GB</span><span><strong>Color:</strong> Space Gray</span>
                </div>
            </a>
        </div>
        
        <div class="px-3 my-3 text-center">
            <div class="cart-item-label">Quantity</div>
            <div class="count-input">
                <select class="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </select>
            </div>
        </div>
        <div class="px-3 my-3 text-center">
            <div class="cart-item-label">Subtotal</div><span class="text-xl font-weight-medium">$1,450.00</span>
        </div>
        <div class="px-3 my-3 text-center">
            <div class="cart-item-label">Discount</div><span class="text-xl font-weight-medium">—</span>
        </div>
        
</div>
        <div class="d-sm-flex justify-content-between align-items-center text-center text-sm-left">
        <form class="form-inline py-2">
            <label class="sr-only">Coupon code</label>
            <input class="form-control form-control-sm my-2 mr-3" type="text" placeholder="Coupon code" required=""></input>
            <button class="btn btn-style-1 btn-secondary btn-sm my-2 mx-auto mx-sm-0" type="submit">Apply Coupon</button>
        </form>
        <div class="py-2"><span class="d-inline-block align-middle text-sm text-muted font-weight-medium text-uppercase mr-2">Subtotal:</span><span class="d-inline-block align-middle text-xl font-weight-medium">$188.50</span></div>
    </div>

    <hr class="my-2"></hr>
    <div class="row pt-3 pb-5 mb-2">
        <div class="col-sm-6 mb-3"><a class="btn btn-style-1 btn-secondary btn-block" href="#"><i class="fe-icon-refresh-ccw"></i>&nbsp;Update Cart</a></div>
        <div class="col-sm-6 mb-3"><a class="btn btn-style-1 btn-primary btn-block" href="checkout-address.html"><i class="fe-icon-credit-card"></i>&nbsp;Place Your Order</a></div>
    </div>

    
            <Footer />
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Cart;
