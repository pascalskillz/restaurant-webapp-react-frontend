import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import { default as Sb } from '../components/SidebarCard';
import '../styles/Menu.css'
import img from '../img/old-logo.jpg'

class Menu extends Component {
  state = {
    categories: [ 
      'Apps', 'Soups', 'Tandoor Breads', 'Tandoori Specialties', 'Chicken Specialties',
      'Lamb Specialties', 'Seafood Specialties', 'Vegetarian Specialties', 'Rice Specialties', 'Dosai',
      'Uthapam', 'North Indian Dinner/Thali', 'Accompaniments', 'Desserts', 'Beverages' 
    ],
    items: [ 
      { 'catName': 'Apps', 'catItems': ['app1', 'app2'] }, 
      { 'catName': 'Soups', 'catItems': ['soup1', 'soup2']},
      { 'catName': 'Tandoor Breads', 'catItems': ['tb1', 'tb2'] }, 
      { 'catName': 'Tandoori Specialties', 'catItems': ['ts1', 'ts2'] }, 
      { 'catName': 'Chicken Specialties', 'catItems': ['cs1', 'cs2'] },
      { 'catName': 'Lamb Specialties', 'catItems': ['ls1', 'ls2'] }, 
      { 'catName': 'Seafood Specialties', 'catItems': ['ss1', 'ss2'] }, 
      { 'catName': 'Vegetarian Specialties', 'catItems': ['vs1', 'vs2']}, 
      { 'catName': 'Rice Specialties', 'catItems': ['rs1', 'rs2'] }, 
      { 'catName': 'Dosai', 'catItems': ['d1', 'd2'] },
      { 'catName': 'Uthapam', 'catItems': ['u1', 'u2'] }, 
      { 'catName': 'North Indian Dinner/Thali', 'catItems': ['noin1', 'noin2'] },
      { 'catName': 'Accompaniments', 'catItems': ['acc1', 'acc2'] }, 
      { 'catName': 'Desserts', 'catItems': ['des1', 'des2'] },
      { 'catName': 'Beverages', 'catItems': ['bev1', 'bev2'] }, 
    ],
    favs: [],
    selected: 'Loading...',
  }

  componentDidMount() {
    this.getFavorites()
    this.setSidebar(500)
  }
  
  getFavorites = async () => {
    let localFavs = [...this.state.categories]
    let temp = []
    for (var i = 0; i < 12; i++){
      let rand = Math.floor(Math.random() * localFavs.length)
      temp[i] = localFavs[rand]
      localFavs.splice(rand, 1)
    }
    await this.setState({
      favs: [...temp],
      selected: 'Full Menu'
    })
  }

  setSidebar(x) {
    let length = this.state.categories.length;
    for(var i = 0; i < length; i++){
      if(x === i){
        document.getElementById(`sbItem-${i}`).setAttribute('sbactive', 'true');
        this.setState({
          selected: this.state.categories[i]
        })
      }
      else if(x === 500){
        document.getElementById(`sbItem-500`).setAttribute('sbactive', 'true');
        document.getElementById(`sbItem-${i}`).setAttribute('sbactive', 'false');
        this.setState({
          selected: 'Full Menu'
        })
      }
      else {
        document.getElementById(`sbItem-${i}`).setAttribute('sbactive', 'false');
        document.getElementById(`sbItem-500`).setAttribute('sbactive', 'false');
      }
    }
  }

  render() {
    const filteredItemList = this.state.items.filter(item => {
      return item.catName === this.state.selected
    })
    .map((item, index) => (
        <div key={index} className="filtered">
          {item.catItems.map((item, index) => (
            <div key={index} className="filtered-inner-item">
              {item}
            </div>
          ))}
        </div>
      )
    )

    const allItemsList = this.state.items.filter(item => {
      return item.catName.length > 0
    })
    .map((item, index) => (
        <div key={index} className="filtered">
          {item.catItems.map((item, index) => (
            <div key={index} className="filtered-inner-item">
              {item}
            </div>
          ))}
        </div>
      )
    )

    return (
      <MyConsumer>
        {({ }) => (
          <div className="menu-div">
            <div className="menu-sidebar">
              <div className="sidebar-top-div sb-toggle" id='sbItem-500' onClick={() => this.setSidebar(500)}>
                <Sb name='Full Menu' img={img} />
              </div>
              <div className="sidebar-inner-div">
                { this.state.categories.map((item, index) => (
                  <div key={index} id={`sbItem-${index}`} className="sidebar-inner-item sb-toggle" sbactive='false' onClick={() => this.setSidebar(index)}>
                    <Sb name={item} img={img} />
                  </div>
                )) }
              </div>
            </div>
            <div className="menu-categories">
              <div className="title-div">
                <div className="title-header-text">{this.state.selected}</div>
                  {/* {
                    this.state.selected === 'Full Menu'
                    ? <div className="subtitle-text">Favorite Items</div>
                    : <div className="subtitle-text"></div>
                  } */}
              </div>
              <div className="category-inner-div">
                {
                  this.state.selected === 'Full Menu'
                  ? <div>{ allItemsList }</div>
                  : <div>{ filteredItemList }</div>
                }
              </div>
            </div>
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Menu;