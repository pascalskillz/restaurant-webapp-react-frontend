import React, { Component } from 'react';
import Detail from '../components/Detail'
import API from '../utils/API'

class Item extends Component {

  state = {
    renderItem: []
  }

  componentDidMount() {
    this.getOneMenuItem(this.getIdFromURL())
  }

  getIdFromURL = () => {
    return window.location.pathname.split('item/')[1]
  }

  getOneMenuItem = async(id) => {
    API
      .getOneMenuItem(id)
      .then(res => {
        // console.log(res.data)
        this.setState({
          renderItem: res.data
        })
      })
  }

  render() {
    return (
      <div>
        <Detail 
          name={this.state.renderItem.itemName} 
          desc={this.state.renderItem.description} 
        />
      </div>
    );
  }
}

export default Item;