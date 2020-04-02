import React, { Component } from 'react';
import API from '../../utils/API';

class Orders extends Component {

  state = {
    orders: [],
    displayOrderDetails: false,
    orderIDToView: -1
  };

  componentDidMount() {
    this.getAllOrders();
  }

  getAllOrders = async () => {
    let allOrders = [];

    await API.getAllOrders().then(res => {
      let theData = res.data;
      console.log(theData);
      allOrders = [...theData];
    });
    this.setState({
      orders: allOrders
    });
  };

  viewOrderDetails = (id) => {
    console.log(id)
    this.setState({
      displayOrderDetails: true,
      orderIDToView: id
    })
  }

  render() {
    const allOrdersList = this.state.orders.map((order, index) => (
      <tr key={index}>
        <td>{order.id}</td>
        <td>{order.orderDate}</td>
        <td>{order.customerName}</td>
        <td>{order.amount}</td>
        <td><a onClick={() => this.viewOrderDetails(order.id)} className='btn btn-primary btn-order-view'>
          View </a>
        </td>
      </tr>
    ));

    return (

      //check whether displayOrderDetails is true. If true, display orderdetails sections
      //if false then display order list table
      // we should have a back button in order details pages that turns the displayOrderDetails to false

      //sort orders by date from backend
      <div className="order-widget">
        <div className="order-details-container">
          <div className="customer-order">
            <div className="customer-info">
              <p>Customer Name: <span> John Doe</span> </p>
              <p>Customer Phone: <span> 7325773492</span></p>
            </div>
            <div className="order-info">
              <p>Order date: <span> April 10, 2020</span></p>
              <p>Grand Total: <span>$45</span></p>
            </div>
          </div>
          <div className="details-table">
            <div className="order-items">
              <table className="table table-striped">
                <thead className='thead-dark'>
                  <tr>
                    <th>ID</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Chicken Cuisine</td>
                    <td>5</td>
                    <td>$ 12</td>
                    <td>$ 60</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Chicken Cuisine</td>
                    <td>5</td>
                    <td>$ 12</td>
                    <td>$ 60</td>
                  </tr>
                  <tr className="grand-total">
                    <td><span>Grand Total: </span>$120</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className='table-scroll order-table'>
          <table className='table table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Order ID</th>
                <th scope='col'>Order Date</th>
                <th scope='col'>Customer Name</th>
                <th scope='col'>Order Total</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {allOrdersList}
            </tbody>
          </table>
        </div> */}
      </div>
    );
  }
}
export default Orders;