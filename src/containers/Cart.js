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
       // <ListGroup horizontal key={index}>
       //   <ListGroup.Item>This</ListGroup.Item>
       //   <ListGroup.Item>ListGroup</ListGroup.Item>
       //   <ListGroup.Item>renders</ListGroup.Item>
       //   <ListGroup.Item>horizontally!</ListGroup.Item>
       // </ListGroup>

       <Row style={{display:'flex'}}>
         <Col>
           <Image
             style={{ height: "200px" }}
             src={item.imageUrl}
             rounded
           />
         </Col>
         <Col style={{display:'float-right'}}>
           <Button>添加</Button>
         </Col>
       </Row>
       //   <div key={index} className="all-grid-item">
       //     <Link to={"/item/" + item.id}>
       //       <Item
       //         img={item.imageUrl}
       //         name={item.itemName}
       //         price={item.itemPrice}
       //         id={item.id}
       //       />
       //     </Link>
       // </div>
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
            <div className="cart-div">
              <div className="menu-categories">
                <div className="category-title-div">
                  <div className="title-header-text">Cart List</div>
                </div>
                <div className="category-item-container">
                  <Container> {allItemsList}</Container>
                </div>
              </div>
              <div className="checkout-sidebar">
                <Fragment>
                  <Sb name="Total Amount" img={img} />
                  <div className="sidebar-inner-div">
                    <Sb name={"Placeholder"} img={img} />
                  </div>
                  </Fragment>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Cart;
