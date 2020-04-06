import axios from 'axios';

const url = 'http://tandoor-env.mdtaz78ptd.us-east-1.elasticbeanstalk.com/api';
const localUrl = 'http://localhost:8080/api' // this will not work in production

export default {

  getAllMenuItems() {
    return axios.get(`${url}/menuitems`)
  },

  getOneMenuItem(itemId) {
    return axios.get(`${url}/menuitems/${itemId}`)
  },

  createMenuItem(categoryId, itemData) {
    // console.log(`${url}/menuitems?categoryId=${categoryId}`, itemData)
    return axios.post(`${url}/menuitems?categoryId=${categoryId}`, itemData)
  },

  updateMenuItem(categoryId, itemData) {
    return axios.put(`${url}/menuitems?categoryId=${categoryId}`, itemData)
  },

  deleteMenuItem(itemId) {
    return axios.delete(`${url}/menuitems/${itemId}`)
  },

  addSimilarItem(itemId, itemData) {
    return axios.post(`${url}/menuitems/${itemId}/similaritem`, itemData)
  },

  getCategories() {
    return axios.get(`${url}/categories`)
  },

  // Orders api request

  getAllOrders() {
    return axios.get(`${localUrl}/orders`)
  },

  getOneOrder(orderId) {
    return axios.get(`${url}/orders/${orderId}`)
  },

  createNewOrder(orderData) {
    return axios.post(`${url}/orders`)
  },

  deleteOrder(orderId) {
    return axios.delete(`${url}/orders/${orderId}`)
  },

  updateOrder(orderId) {
    return axios.put(`${url}/orders/${orderId}`)
  }

}


