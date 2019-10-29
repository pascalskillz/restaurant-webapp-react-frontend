import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import { default as Sb } from '../components/SidebarCard';
import { default as Item } from '../components/MenuItem';
import '../styles/Menu.css';
import img from '../img/old-logo.jpg';

class Menu extends Component {
  state = {
    menuItems: [
      { id: 0, category: 'Apps', name: 'app1', cookTime: 5, isVegan: false },
      { id: 1, category: 'Apps', name: 'app2', cookTime: 5, isVegan: false },
      { id: 2, category: 'Soups', name: 'soup1', cookTime: 5, isVegan: false },
      { id: 3, category: 'Soups', name: 'soup2', cookTime: 5, isVegan: false },
      { id: 4, category: 'Soups', name: 'soup3', cookTime: 5, isVegan: false },
      { id: 5, category: 'Tandoor Breads', name: 'tb1', cookTime: 5, isVegan: false },
      { id: 6, category: 'Tandoor Breads', name: 'tb2', cookTime: 5, isVegan: false },
      { id: 7, category: 'Tandoor Breads', name: 'tb3', cookTime: 5, isVegan: false },
      { id: 8, category: 'Tandoor Breads', name: 'tb4', cookTime: 5, isVegan: false },
      { id: 9, category: 'Tandoor Breads', name: 'tb5', cookTime: 5, isVegan: false },
      { id: 10, category: 'Tandoor Breads', name: 'tb6', cookTime: 5, isVegan: false },
      { id: 11, category: 'Tandoor Breads', name: 'tb7', cookTime: 5, isVegan: false },
      { id: 12, category: 'Tandoor Breads', name: 'tb8', cookTime: 5, isVegan: false },
      { id: 13, category: 'Tandoor Breads', name: 'tb9', cookTime: 5, isVegan: false },
      { id: 14, category: 'Tandoor Specials', name: 'ts2', cookTime: 5, isVegan: false },
      { id: 15, category: 'Tandoor Specials', name: 'ts1', cookTime: 5, isVegan: false },
    ],
    favs: [],
    allItems: [],
    categories: [],
    // items: [],
    allItemsLoading: true,
    selected: 'Loading...',
  }

  componentDidMount() {
    // this.getFavorites()
    this.gatherAllItems()
    this.getCategories()
  }
  
  // NOT CURRENTLY BEING USED
  // getFavorites = async() => {
  //   let localFavs = [...this.state.categories]
  //   let temp = []
  //   for (var i = 0; i < 12; i++){
  //     let rand = Math.floor(Math.random() * localFavs.length)
  //     temp[i] = localFavs[rand]
  //     localFavs.splice(rand, 1)
  //   }
  //   await this.setState({
  //     favs: [...temp],
  //     selected: 'Full Menu'
  //   })
  // }

  getCategories = async() => {
    let sidebar = []
    let menuItems = this.state.menuItems;
    for(var i = 0; i < menuItems.length; i++){
      if (!sidebar.includes(menuItems[i]['category'])){
        sidebar.push(menuItems[i]['category'])
      }
    }
    await this.setState({
      categories: [...sidebar]
    })
    await this.setSidebar(500)
  }

  setSidebar = async(x) => {
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
  
  gatherAllItems = async() => {
    const allItemsArr = []
    const items = this.state.menuItems;
    for (var i = 0; i < items.length; i++){
      allItemsArr.push(items[i]['name'])
    }

    await this.setState({
      allItems: [...allItemsArr],
      allItemsLoading: false,
    })
  }

  render() {
    
    const filteredItemList = this.state.menuItems.filter(item => {
      return item.category === this.state.selected
    })
    .map((item, index) => (
      <div key={index} className="filtered-grid-item">
        <Item img={img} name={item.name} />
      </div>
      )
    )

    const allItemsList = this.state.allItems.map((item, index) => (
      <div key={index} className="all-grid-item">
        <Item img={img} name={item} />
      </div>
    ))

    return (
      <MyConsumer>
        {({ state }) => (
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
              <div className="category-title-div">
                <div className="title-header-text">{this.state.selected}</div>
                  {/* {
                    this.state.selected === 'Full Menu'
                    ? <div className="subtitle-text">Favorite Items</div>
                    : <div className="subtitle-text"></div>
                  } */}
              </div>
              <div className="category-item-container">
                {
                  this.state.selected === 'Full Menu'
                  ? !this.state.allItemsLoading ? <div className='all-item-div'>{ allItemsList }</div> : <div>Loading...</div> 
                  : <div className='category-item-div'>{ filteredItemList }</div>
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