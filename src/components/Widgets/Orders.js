import React, { Component } from 'react';
import API from '../../utils/API';
import OrderDetails from './OrderDetails';
import { Pagination } from 'react-bootstrap';
import PageComp from './PageComp';

class Orders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      displayOrderDetails: false,
      orderIDToView: -1,
      currentPage: 1,
      ordersPerPage: 5,
      totalPages: 0,
      totalElements: 0
    };
  }

  componentDidMount() {
    this.getAllOrders(this.state.currentPage);
  }

  getAllOrders = async (currentPage) => {
    let allOrders = [];
    let pageNum = 0;
    let pageTotal = 0;
    let elementsTotal = 0;

    await API.getAllOrders(currentPage, this.state.ordersPerPage)
      .then(res => {
        let theData = res.data.content;
        pageNum = res.data.number + 1;
        pageTotal = res.data.totalPages;
        elementsTotal = res.totalElements;
        //console.log(theData);
        allOrders = [...theData];
      });
    this.setState({
      orders: allOrders,
      currentPage: pageNum,
      totalPages: pageTotal,
      totalElements: elementsTotal
    });
  };

  viewOrderDetails = (id) => {
    //console.log(id);
    this.setState({
      displayOrderDetails: true,
      orderIDToView: id
    });
    //console.log(this.state.orderIDToView);
    //console.log(this.state.displayOrderDetails);
  }
  completeView = () => {
    this.setState({
      displayOrderDetails: false
    })
  }

  handleFirst = () => {
    if (this.state.currentPage > 1) {
      this.getAllOrders(1);
    }
  }
  handleNext = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.getAllOrders(this.state.currentPage + 1);
    }
  }

  handlePrev = () => {
    if (this.state.currentPage > 1) {
      this.getAllOrders(this.state.currentPage - 1);
    }
  }
  handleLast = () => {
    if (this.state.currentPage != this.state.totalPages) {
      this.getAllOrders(this.state.totalPages);
    }
  }

  render() {

    var dateFormatter = new Intl.DateTimeFormat(
      "en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });

    const allOrdersList = this.state.orders.map((order, index) => (
      <tr key={index}>
        <td>{order.id}</td>
        <td>{dateFormatter.format(Date.parse(order.orderDate))}</td>
        <td>{order.customerName}</td>
        <td>${order.amount}</td>
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

              <div className="pagination-container">
                <div className="paging">
                  <div className="page-count">
                    <span>
                      Showing {this.state.currentPage} of {this.state.totalPages} Pages
						      </span>
                  </div>
                  <div className="page-numbers">
                    <Pagination>
                      <Pagination.First onClick={() => this.handleFirst()} />
                      <Pagination.Prev onClick={() => this.handlePrev()} />
                      <Pagination.Next onClick={() => this.handleNext()} />
                      <Pagination.Last onClick={() => this.handleLast()} />
                    </Pagination>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}
export default Orders;