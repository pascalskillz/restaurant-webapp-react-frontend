import React, { Component } from 'react';
import API from '../../utils/API';


class OrderDetails extends Component {

    state = {
        order: {}
    }

    componentDidMount() {
        this.getOrder(this.props.orderId);
    }
    getOrder = async (id) => {
        let order = {};
        await API.getOneOrder(id).then(res => {
            order = res.data;
        });
        this.setState({
            order: order
        });
        console.log(order);
    }
    render() {
        return (
            <div className="order-details-container">
                <div className="customer-order">
                    <div className="customer-info">
                        <p>Customer Name: <span>{this.state.order.customerName}</span> </p>
                        <p>Customer Phone: <span>{this.state.order.customerPhone}</span></p>
                    </div>
                    <div className="order-info">
                        <p>Order ID: <span>#{this.props.orderId}</span></p>
                        <p>Order date: <span>{this.state.order.orderDate}</span></p>
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
                                    <td colSpan="5"> <span>Grand Total: </span>$120</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='buttonFromProps btn'>{this.props.closeButton}</div>
            </div>
        );
    }

}
export default OrderDetails;