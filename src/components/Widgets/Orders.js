import React, { Component } from 'react';
import API from '../../utils/API';

class Orders extends Component {

  state = {
    orders: []
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

  render() {
    const allOrdersList = this.state.orders.map((order, index) => (
      <tr key={index}>
        <td>{order.id}</td>
        <td>{order.orderDate}</td>
        <td>{order.customerName}</td>
        <td>{order.amount}</td>
        <td><a className='btn btn-primary btn-order-view'> View </a></td>
      </tr>
    ));

    return (
      <div className='table-scroll edit-table'>
        <table className='table table-striped'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Order ID</th>
              <th scope='col'>Orders Date</th>
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
    );
  }
}
export default Orders;