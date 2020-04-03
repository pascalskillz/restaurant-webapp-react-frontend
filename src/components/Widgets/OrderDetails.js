import React, { Component } from 'react';
import API from '../../utils/API';


class OrderDetails extends Component {

    state = {
        order: {},
        orderDetails: [],
        menutItemIds: [],
        menuItems: []
    }

    componentDidMount() {
        this.getOrder(this.props.orderId);
        //this.getMenuItems();
    }
    getOrder = async (id) => {
        let order = {};
        let orderDetails = [];
        await API.getOneOrder(id).then(res => {
            order = res.data;
            orderDetails = res.data.orderDetails;
        });
        this.setState({
            order: order,
            orderDetails: orderDetails
        });
        console.log(order);
        console.log(orderDetails);
        this.getMenuItemIds(orderDetails);
        this.getMenuItems();
    }

    getMenuItemIds = (detailsArray) => {
        let menuItemIds = [];
        for (var i = 0; i < detailsArray.length; i++) {
            menuItemIds[i] = detailsArray[i].menuItemId;
        }
        this.setState({
            menuItemIds: menuItemIds
        });
    }

    getMenuItems = async () => {
        let menuItems = []
        for (var i = 0; i < this.state.menuItemIds.length; i++) {
            await API.getOneMenuItem(this.state.menuItemIds[i]).then(res => {
                menuItems[i] = res.data
            });
        }
        this.setState({
            menuItems: menuItems
        });
        console.log(menuItems);
    }
    render() {

        let orderItemList = this.state.menuItems.map((item, index) => (
            // this.state.orderDetails.map((item) => (
            <tr key={index}>
                <td>{index}</td>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>$ {item.itemPrice}</td>
                <td>{`${item.itemPrice}`}*{`${item.itemPrice}`}</td>
            </tr>
            // ))
        ));

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
                                    <th>#</th>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItemList}
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