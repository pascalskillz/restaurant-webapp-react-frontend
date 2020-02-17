import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { default as MenuItem } from '../components/MenuItem';
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
    similarItems: [],
    categoryName: ''
  };

  async componentDidMount() {
    await this.getOneMenuItem(this.getIdFromURL());
    // await this.getCategoryName();
  }

  getIdFromURL = () => {
    return window.location.pathname.split('item/')[1];
  };

  // getCategoryName = async () => {
  //   let itemCatId = this.state.renderItem;
  //   await console.log(itemCatId);
  //   let categories = [];
  //   let catName = '';
  //   API.getCategories().then(async res => {
  //     categories = await [...res.data];
  //     // await console.log(categories)
  //     for (let i of categories) {
  //       // console.log(i)
  //       if (i.id === itemCatId) {
  //         catName = i.categoryName;
  //         // console.log(catName);
  //         this.setState({
  //           categoryName: catName
  //         });
  //       }
  //     }
  //   });
  // };

  getOneMenuItem = async id => {
    await API.getOneMenuItem(id).then(res => {
      console.log(res.data);
      this.setState({
        renderItem: res.data,
        similarItems: [...res.data.similarItems]
      });
    });
    let itemCatId = await this.state.renderItem.categoryId;
    // await console.log(itemCatId)
    let categories = [];
    let catName = '';
    await API.getCategories().then(async res => {
      categories = await [...res.data];
      // await console.log(categories)
      for (let i of categories) {
        // console.log(i)
        if (i.id === itemCatId) {
          catName = i.categoryName;
          // console.log(catName);
          this.setState({
            categoryName: catName
          });
        }
      }
    });
    // await this.getSimilarItems();
  };

<<<<<<< HEAD
  getOneMenuItem = async id => {
    API.getOneMenuItem(id).then(res => {
      console.log(res.data);
      this.setState({
        renderItem: res.data
      });
=======
  getSimilarItems = async () => {
    // console.log(this.state.similarItems);
    let itemCount = 0;
    await API.getAllMenuItems().then(res => {
      itemCount = res.data.length;
>>>>>>> 1f555abad273b90a62bc228cd6482e0788ec23ac
    });
    // await console.log(itemCount);
    for (let i = 0; i < 3; i++) {
      let rand = await Math.floor(Math.random() * itemCount);
      // console.log(rand);
      await API.getOneMenuItem(rand).then(res => {
        // console.log(res.data);
        this.setState({
          similarItems: [...this.state.similarItems, res.data]
        });
      });
    }
  };

  addtoChart = (Item,e) => {
      e.preventDefault();
      if(Item.id!==undefined){
        chartStore.addItem(Item.id, Item);
      }
  }

  render() {
<<<<<<< HEAD
    const Item = this.state.renderItem;
=======
    const item = this.state.renderItem;
    const similarItemsList = this.state.similarItems.map((item, index) => (
      <div key={index} className='sim'>
        <Link to={'/item/' + item.id}>
          <MenuItem
            img={item.imageUrl}
            name={item.itemName}
            price={item.itemPrice}
            id={item.id}
          />
        </Link>
      </div>
    ));
>>>>>>> 1f555abad273b90a62bc228cd6482e0788ec23ac
    return (
      <div className='item-js top'>
        <Navbar />
        <Jumbo
          src={
<<<<<<< HEAD
            Item.imageUrl ||
=======
            item.imageUrl ||
>>>>>>> 1f555abad273b90a62bc228cd6482e0788ec23ac
            'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
          }
          alt='Menu Item Detail'
          text={this.state.categoryName || 'Tandoor Restauraunt'}
        />
<<<<<<< HEAD

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

=======
        <Detail
          name={item.itemName}
          price={item.itemPrice}
          img={item.imageUrl}
          desc={item.description}
        />
        <div className='similar-items-container'>
          <div className='sim-title'>Similar Items</div>
          <div className='sim-items'>{similarItemsList}</div>
          {/* <div className='sim-items'>
            <Link to={'/item/' + item.id}>
              <MenuItem
                img={item.imageUrl}
                name={item.itemName}
                price={item.itemPrice}
                id={item.id}
              />
            </Link>
            <Link to={'/item/' + item.id}>
              <MenuItem
                img={item.imageUrl}
                name={item.itemName}
                price={item.itemPrice}
                id={item.id}
              />
            </Link>
          </div> */}
        </div>
>>>>>>> 1f555abad273b90a62bc228cd6482e0788ec23ac
        <Footer />
      </div>
    );
  }
}

export default Item;
