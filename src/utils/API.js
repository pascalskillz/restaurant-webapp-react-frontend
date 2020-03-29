import axios from 'axios';

const url = 'http://tandoor-env.mdtaz78ptd.us-east-1.elasticbeanstalk.com/api';

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

  updateMenuItem(itemId, itemData) {
    return axios.post(`${url}/menuitems/${itemId}`, itemData)
  },

  deleteMenuItems(itemId) {
    return axios.delete(`${url}/menuitems/${itemId}`)
  },

  addSimilarItem(itemId, itemData) {
    return axios.post(`${url}/menuitems/${itemId}/similaritem`, itemData)
  },

  getCategories() {
    return axios.get(`${url}/categories`)
  },

  addReservation(itemData) {
    return axios.post(`${url}/menuitems/reservations`, itemData)
  },

}


