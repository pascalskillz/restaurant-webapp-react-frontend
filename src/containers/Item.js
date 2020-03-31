import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { default as MenuItem } from '../components/MenuItem';
import Detail from '../components/Detail';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Jumbo from '../components/Jumbo';
import API from '../utils/API';
import chartStore from '../store/chartStorage';
import '../styles/Item.css'


class Item extends Component {
  constructor(props){
     super(props);
     this.addtoChart = this.addtoChart.bind(this);
  };
  state = {
    renderItem: [],
    similarItems: [],
    categoryName: '',
    isRefresh:false
  };

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.location && nextProps.location.itemID > 0){
      nextProps.location.itemID = 0;
      return { isRefresh: true};
   }
   else return null;
 }

  async componentDidMount() {
    await this.getOneMenuItem(this.getIdFromURL());
  }

  async componentDidUpdate()
  {
    if(this.state.isRefresh)
    {
      await this.getOneMenuItem(this.getIdFromURL());
      window.scrollTo(0, 0);
    }
  }

  getIdFromURL = () => {
    return window.location.pathname.split('item/')[1];
  };

  getOneMenuItem = async id => {
    let renderItem = {};
    let similarItemIDs = [];

    await API.getOneMenuItem(id).then(res => {
      renderItem = res.data;
      similarItemIDs = [...res.data.similarItems];
    });
    let itemCatId = await this.state.renderItem.categoryId;
    let categories = [];
    let catName = '';
    await API.getCategories().then(async res => {
      categories = await [...res.data];
      for (let i of categories) {
        if (i.id === itemCatId) {
          catName = i.categoryName;
          break;
        }
      }
    });
    let similarItems = await this.getSimilarItems(similarItemIDs);
    this.setState({
        renderItem: renderItem,
        similarItems: similarItems,
        categoryName: catName,
        isRefresh:false
      });
  };

  getSimilarItems = async itemIDS => {
    let similarItems = [];
    if(itemIDS.length > 0)
    {
        let maxItems = itemIDS.length > 3 ? 3 : itemIDS.length;
        for (let i = 0; i < maxItems; i++) {
        await API.getOneMenuItem(itemIDS[i].similarMenuItemId).then(res => {
          similarItems = [...similarItems, res.data]
        });
      }
    }
    return similarItems;
  };

  addtoChart = (Item,e) => {
      e.preventDefault();
      if(Item.id!==undefined){
        chartStore.addItem(Item.id, Item);
      }
  }

  render() {
    const item = this.state.renderItem;
    const similarItemsList = this.state.similarItems.map((item, index) => (
      <div key={index} className='sim'>
        <Link to={{ pathname: '/item/' + item.id, itemID: item.id }}>
          <MenuItem
            img={item.imageUrl}
            name={item.itemName}
            price={item.itemPrice}
            id={item.id}
          />
        </Link>
      </div>
    ));
    return (
      <div className='item-js top'>
        <Navbar />
        <Jumbo
          src={
            item.imageUrl ||
            'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
          }
          alt='Menu Item Detail'
          text={this.state.categoryName || 'Tandoor Restauraunt'}
        /> 
        <div className="container">
          <div className="menu-item-row row">
            <div className="item-image">
              <img src={item.imageUrl} alt={item.itemName}/>
            </div>
            <div className="item-detail">
              <h2>{item.itemName}</h2>
              <h4>${item.itemPrice}</h4>
              <div>
                <p>{item.description}</p>
              </div>
              <div className="item-button">
                <button onClick={(e) => this.addtoChart(item,e)}>Add To Cart</button>
              </div>
            </div>
          </div>
          <div className="row"></div>
        </div>

        <div className='similar-items-container'>
        <div className='sim-title'>{similarItemsList.length > 0 ? 'Similar Items' : ''}</div>
          <div className='sim-items'>{similarItemsList}</div>
        </div>       
        <Footer />
      </div>
    );
  }
}

export default Item;
