import React, { Component } from 'react';
import API from '../../utils/API';
import OrderDetails from './OrderDetails';

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
    console.log(id);
    this.setState({
      displayOrderDetails: true,
      orderIDToView: id
    });
    console.log(this.state.orderIDToView);
    console.log(this.state.displayOrderDetails);
  }
  completeView = () => {
    this.setState({
      displayOrderDetails: false
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
        {this.state.displayOrderDetails ?
          (<OrderDetails
            orderId={this.state.orderIDToView}
            closeButton={
              <div
                id='close-button-back-button'
                onClick={() => this.completeView()}>
                <i className='fas fa-arrow-left'></i> BACK
              </div>
            }
          />) : (
            <div className='table-scroll order-table'>
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
            </div>
          )}
      </div>
    );
  }
}
export default Orders;