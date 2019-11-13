import axios from 'axios';

const url = 'http://dev-tandoor.us-east-1.elasticbeanstalk.com';

export default {

  getAllMenuItems() {
    return axios.get(`${url}/api/menuitems`)
  },

  getOneMenuItem(itemId) {
    return axios.get(`${url}/api/menuitems/${itemId}`)
  },

  createMenuItem(itemData) {
    return axios.post(`${url}/api/menuitems`, itemData)
  },

  deleteMenuItems(itemId) {
    return axios.delete(`${url}/api/menuitems${itemId}`)
  },

  addSimilarItem( itemId, itemData ) {
    return axios.post(`${url}/api/menuitems/${itemId}/similaritem`, itemData)
  },

  getCategories() {
    return axios.get(`${url}/api/categories`)
  }

}


