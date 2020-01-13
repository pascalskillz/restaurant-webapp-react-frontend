import React, { Component } from 'react';
import Detail from '../components/Detail';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Jumbo from '../components/Jumbo';
import API from '../utils/API';

class Item extends Component {
  state = {
    renderItem: [],
    categoryName: ''
  };

  async componentDidMount() {
    await this.getOneMenuItem(this.getIdFromURL());
    await this.getCategoryName();
  }

  getIdFromURL = () => {
    return window.location.pathname.split('item/')[1];
  };

  getCategoryName = async () => {
    let categories = [];
    let catName = '';
    API.getCategories().then(async res => {
      categories = await [...res.data];
      // await console.log(categories)
      for (let i of categories) {
        // console.log(i)
        if (i.id === this.getIdFromURL()) {
          catName = i.categoryName;
          // console.log(catName);
          this.setState({
            categoryName: catName
          });
        }
      }
    });
  };

  getOneMenuItem = async id => {
    API.getOneMenuItem(id).then(res => {
      // console.log(res.data);
      this.setState({
        renderItem: res.data
      });
    });
  };

  render() {
    return (
      <div className='item-js top'>
        <Navbar />
        <Jumbo
          src={
            this.state.renderItem.imageUrl ||
            'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
          }
          alt='Menu Item Detail'
          text={this.state.categoryName || 'Tandoor Restauraunt'}
        />
        <Detail
          name={this.state.renderItem.itemName}
          price={this.state.renderItem.itemPrice}
          img={this.state.renderItem.imageUrl}
          desc={this.state.renderItem.description}
        />
        <Footer />
      </div>
    );
  }
}

export default Item;
