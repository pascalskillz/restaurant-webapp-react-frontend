import axios from 'axios';

const url = 'http://dev-tandoor.us-east-1.elasticbeanstalk.com/api';

export default {

  getAllMenuItems() {
    return axios.get(`${url}/menuitems`)
  },

  getOneMenuItem(itemId) {
    return axios.get(`${url}/menuitems/${itemId}`)
  },

  createMenuItem(itemData) {
    return axios.post(`${url}/menuitems`, itemData)
  },

  deleteMenuItems(itemId) {
    return axios.delete(`${url}/menuitems/${itemId}`)
  },

  addSimilarItem( itemId, itemData ) {
    return axios.post(`${url}/menuitems/${itemId}/similaritem`, itemData)
  },

  getCategories() {
    return axios.get(`${url}/categories`)
  }

}


