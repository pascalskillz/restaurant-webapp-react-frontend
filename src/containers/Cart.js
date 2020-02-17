import React, { Fragment,Component } from "react";
import { MyConsumer } from '../Context';
import { default as Sb } from "../components/SidebarCard";
import { default as Item } from "../components/MenuItem";
import Jumbo from '../components/Jumbo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from "../utils/API";
import img from "../img/old-logo.jpg";
import "../styles/Menu.css";
import '../styles/cart.css';
import { Image, Button, Container } from "react-bootstrap";

import store from '../store'
import chartStorage from "../store/chartStorage";
import { Row, Col } from "react-bootstrap";



class Cart extends Component {
  state = {
    allItems: [],
    categories: [],
    allItemsLoading: true,
    categoryLoading: true,
    selected: 'Loading...',
    mobile: false
  };

  componentDidMount() {
    this.gatherAllItems();
  }

  scrollToTop = () => {
    window.onbeforeunload = function() {
      window.scrollTo(0, 0);
    };
  };




  gatherAllItems = async () => {
    let allItemsArr = [];
    allItemsArr = chartStorage.getList();
    await this.setState({
      allItems: [...allItemsArr],
      allItemsLoading: false
    });

  };


  render() {

     const allItemsList = this.state.allItems.map((item, index) => (
       <div style={{ display: 'flex',marginBottom:'15px' }} className='all-grid-item'>
         <div className='cart-item-div'>  
              <Image
                src={item.imageUrl}
                rounded
               className='cart-item-image'
              />
           <div className='cart-item-text'> 
                <span>{item.name}</span>
           </div>
         </div>
         {/* <Col>
           <Image
             style={{ height: "200px" }}
             src={item.imageUrl}
             rounded
             className='image'
           />
         </Col> */}
         <Col style={{display:'float-right'}}>
           <Button>添加</Button>
         </Col>
       </div>
     ));

    return (
      <MyConsumer>
        {({ state }) => (
          <div className="cart-js top">
            <Navbar page="CART" />
            <Jumbo
              src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb"
              alt="Cart Picture"
              text="Your Cart"
            />

            <div className="cart-checkout-div ">
              <div className="menu-categories">
                <div className="category-title-div">
                  <div className="title-header-text">Cart List</div>
                </div>
                <div className="category-item-container">
                  <Container> {allItemsList}</Container>
                </div>
              </div>
              {/* <div className="checkout-sidebar">
                <Fragment>
                  <Sb name="Total Amount" img={img} />
                  <div className="sidebar-inner-div">
                    <Sb name={"Placeholder"} img={img} />
                  </div>
                  </Fragment>
              </div> */}
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
