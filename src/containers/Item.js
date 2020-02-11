import React, { Component } from 'react';
import Detail from '../components/Detail';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Jumbo from '../components/Jumbo';
import API from '../utils/API';
import store from '../store'
import chartStore from '../store/chartStorage';

class Item extends Component {
  constructor(props){
     super(props);
     this.addtoChart = this.addtoChart.bind(this);
  };
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
      console.log(res.data);
      this.setState({
        renderItem: res.data
      });
    });
  };

  addtoChart = (Item,e) => {
      e.preventDefault();
      if(Item.id!==undefined){
        chartStore.addItem(Item.id, Item);
      }
  }

  render() {
    const Item = this.state.renderItem;
    return (
      <div className='item-js top'>
        <Navbar />
        <Jumbo
          src={
            Item.imageUrl ||
            'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
          }
          alt='Menu Item Detail'
          text={this.state.categoryName || 'Tandoor Restauraunt'}
        />

        <div className="container">
          <div className="menu-item-row row">
            <div className="item-image">
              <img src={Item.imageUrl} alt={Item.itemName} />
            </div>
            <div className="item-detail">
              <h2>{Item.itemName}</h2>
              <h4>$ {Item.itemPrice}</h4>
              <div>
                <p>{Item.description}</p>
              </div>
              <div className="item-button">
                <button onClick={(e) => this.addtoChart(Item,e)}>Add To Cart</button>
              </div>
            </div>
          </div>
          <div className="row"></div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Item;
