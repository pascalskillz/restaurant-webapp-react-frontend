import React, { Component } from "react";
import { MyConsumer } from '../Context';
import Jumbo from '../components/Jumbo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Menu.css";
import '../styles/cart.css';
import { Container, Modal, Button } from "react-bootstrap";

import chartStorage from "../store/chartStorage";
import API from "../utils/API";
import Swal from "sweetalert2";



class Cart extends Component {
  state = {
    allItems: [],
    categories: [],
    allItemsLoading: true,
    categoryLoading: true,
    selected: "Loading...",
    mobile: false,
    coupounCode: "",
  };

  componentDidMount() {
    this.gatherAllItems();
  }

  scrollToTop = () => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  };

  submitOrders = (allItems) => {
    // Sweat alert make confirm for this order
    // Swal.fire("Order Submitted", "", "success");

    // clean local cashe
    // chartStorage.clearChart();

    // redirt to the main page
    // window.location.href = "http://localhost:3000/";

    var postData = {
      customerName: "Meng Test",
      customerPhone: "7335727001",
      amount: 0,
      orderDetails: [],
    };

    const lists = chartStorage.getList();
    let amount = 0;
    const tempDeatil = {
      quantity: 0,
      menuItemId: 0,
    };
    console.log(lists);
    for (const i in lists) {
      const temp = lists[i];
      amount += temp.itemPrice;
      tempDeatil.quantity = 1;
      tempDeatil.menuItemId = temp.id;
      postData.orderDetails.push(tempDeatil);
    }

    postData.amount = amount.toFixed(2);
    console.log("postData" + JSON.stringify(postData));
    API.addOrders(postData).then((result) => {
      if (result.status != 400) {
        Swal.fire("Order Submitted", "", "success");
        chartStorage.clearChart();
        // redirt to the main page
        window.location.href = "http://localhost:3000/";
      } else {
        Swal.fire({
          icon: "error",
          title: "Order Filed",
        });
      }
    });
   
   
    //
  };
  /**
   * Reterival oerders from the servrer
   * @param {*} e
   */
  //*************** Start ***************** */
  handelChange(e) {
    this.setState({
      inpValu: e.target.value,
    });
  }

  reterivalOrder = async () => {
    let target;
    await API.getAllOrders().then((res) => {
      let items = res.data.content;
      console.log(items);
      const index = this.state.inpValu;
      for (const i in items) {
        const temp = items[i];
        if (index === temp.id) {
          this.setState({
            tempresult: temp.customerName,
          });
        }
      }
      console.log(target);
      // this.setState({
      //   temp: target.customerName
      // })
    });

    //   for (const value in target.orderDetails) {
    //       let item = await API.getOneMenuItem(value.menuItemId);
    //       chartStorage.addItem(item.data);
    //   }
  };
  //*************** End **************** */

  removeItem(item) {
    const itemList = this.state.allItems;
    console.log(itemList);
    const index = itemList.indexOf(item);
    itemList.splice(index, 1);
    this.setState({
      allItems: [...itemList],
    });
  }

  gatherAllItems = async () => {
    let allItemsArr = [];
    allItemsArr = chartStorage.getList();
    await this.setState({
      allItems: allItemsArr,
      allItemsLoading: false,
    });
  };

  render() {
    let subtotal = 0;
    let allItemsList = [];
    let itemList = this.state.allItems;
    let temp = this.state.tempresult;
   

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
                {/* <div className="row">
                  <div class="col-sm-6 mb-3">
                    Retrival Order:{" "}
                    <input onChange={this.handelChange.bind(this)} />
                  </div>
                  <div class="col-sm-3 mb-3">
                    <button
                      class="btn btn-style-5 btn-primary btn-block"
                      onClick={(e) => this.reterivalOrder(e)}
                    >
                      &nbsp;Submit
                    </button>
                  </div>
                </div>
                <div className="row"> {this.state.tempresult}</div> */}

                <div className="row">
                  <div className="category-item-container">
                    <Container> {allItemsList}</Container>
                  </div>
                </div>
                <div
                  class="d-sm-flex justify-content-between align-items-center text-center text-sm-left"
                  style={{ float: "right" }}
                >
                  <div class="py-2">
                    <span class="d-inline-block align-middle text-sm text-muted font-weight-medium text-uppercase mr-2">
                      Subtotal:
                    </span>
                    <span class="d-inline-block align-middle text-xl font-weight-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div class="col-sm-6 mb-3">
                    <button
                      class="btn btn-style-1 btn-primary btn-block"
                      onClick={(e) => this.submitOrders(itemList)}
                    >
                      &nbsp;Place Your Order{" "}
                    </button>
                  </div>
                </div>
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
